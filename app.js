import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
// Import all necessary functions from Database.js
import { createNote, registerUser, loginUser, getAllListings, getListingById } from './Database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

const uploadDir = path.resolve(__dirname, 'uploads');

// Function to ensure the uploads directory exists
const ensureUploadDir = async () => {
    try {
        await fs.access(uploadDir); // Check if directory exists
    } catch {
        await fs.mkdir(uploadDir, { recursive: true }); // Create if it doesn't
        console.log(`Created upload directory at: ${uploadDir}`);
    }
};

// Multer storage configuration
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        await ensureUploadDir(); // Ensure directory exists before saving
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}${ext}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error("Error: File upload only supports images (jpeg, jpg, png, gif)!"));
    }
});

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(uploadDir));

// --- API Endpoints ---

// Create Listing
app.post('/listings', upload.single('image_file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file uploaded or invalid file type. Please upload a JPEG, JPG, PNG, or GIF image (Max 5MB).' });
        }

        const requiredFields = [
            'title', 'listing_type', 'housing_type', 'campus', 'bedrooms', 'bathrooms', // Corrected 'houser_type' to 'housing_type'
            'square_footage', 'address', 'postal_code',
            'property_description',
            'price',
            'agent_name', 'agent_email', 'agent_phone'
        ];

        const missingFields = requiredFields.filter(field => {
            const value = req.body[field];
            return value === undefined || (typeof value === 'string' && value.trim() === '');
        });

        if (missingFields.length > 0) {
            // If fields are missing, delete the uploaded file to clean up
            await fs.unlink(req.file.path).catch(err => console.error('Error deleting temp file:', err));
            return res.status(400).json({
                error: `Missing or empty required fields: ${missingFields.join(', ')}`
            });
        }

        const imageUrl = `/uploads/${req.file.filename}`;
        
        // Ensure data types are correct before passing to DB function
        const bedrooms = parseInt(req.body.bedrooms);
        const bathrooms = parseFloat(req.body.bathrooms); // Use parseFloat for bathrooms
        const square_footage = parseInt(req.body.square_footage);
        const price = parseFloat(req.body.price);

        // Validate parsed numbers
        if (isNaN(bedrooms) || isNaN(bathrooms) || isNaN(square_footage) || isNaN(price)) {
            await fs.unlink(req.file.path).catch(err => console.error('Error deleting temp file:', err));
            return res.status(400).json({ error: 'Invalid numeric value for bedrooms, bathrooms, square footage, or price.' });
        }

        const result = await createNote(
            req.body.title,
            req.body.listing_type,
            req.body.housing_type, // This now correctly matches the frontend and DB function
            req.body.campus,
            bedrooms,
            bathrooms,
            square_footage,
            req.body.address,
            req.body.postal_code,
            req.body.property_description,
            imageUrl,
            price,
            req.body.agent_name,
            req.body.agent_email,
            req.body.agent_phone
        );

        res.status(201).json({
            success: true,
            message: 'Listing created successfully',
            listingId: result.insertId,
            imageUrl
        });

    } catch (error) {
        console.error('Error creating listing:', error);
        // If an error occurred after file upload but before DB insert, clean up file
        if (req.file) {
            await fs.unlink(req.file.path).catch(err => console.error('Error deleting temp file after DB error:', err));
        }
        if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File size too large. Max 5MB allowed.', details: error.message });
        }
        res.status(500).json({
            error: 'Internal server error during listing creation',
            details: error.message // Provides the underlying database error message
        });
    }
});

// GET all listings
app.get('/listings', async (req, res) => {
    try {
        const listings = await getAllListings();
        res.json(listings);
    } catch (error) {
        console.error('Error fetching all listings:', error);
        res.status(500).json({ error: 'Internal server error when fetching listings', details: error.message });
    }
});

// GET single listing by ID
app.get('/listings/:id', async (req, res) => {
    try {
        const listingId = req.params.id;
        const listing = await getListingById(listingId);

        if (!listing) {
            return res.status(404).json({ error: 'Listing not found' });
        }
        res.json(listing);
    } catch (error) {
        console.error('Error fetching single listing:', error);
        res.status(500).json({ error: 'Internal server error when fetching single listing', details: error.message });
    }
});

// Register
app.post('/register', async (req, res) => {
    try {
        const { full_name, email, password } = req.body;
        if (!full_name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const result = await registerUser(full_name, email, password);
        res.status(201).json({ success: true, message: 'Registration successful', userId: result.insertId });
    } catch (error) {
        console.error('Registration error:', error);
        // MySQL duplicate entry error code (ER_DUP_ENTRY)
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Registration failed', details: 'Email already registered. Please use a different email or log in.' });
        }
        res.status(500).json({ error: 'Registration failed', details: error.message });
    }
});

// Login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }

        const result = await loginUser(email, password);
        if (!result.success) {
            // Use the specific message from Database.js for invalid credentials
            return res.status(401).json({ error: result.message || 'Invalid email or password' });
        }

        // IMPORTANT: The frontend script currently doesn't use an actual token from here,
        // but your login success message in script.js expects a 'user' object.
        // If you were using JWT, you'd generate and send a token here:
        // const token = jwt.sign({ userId: result.user.id, email: result.user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // res.status(200).json({ success: true, message: 'Login successful', token, user: { email: result.user.email, /* other user data */ } });
        
        res.status(200).json({ success: true, message: 'Login successful', user: result.user }); // result.user contains email/full_name from DB.js
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed', details: error.message });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
    await ensureUploadDir(); // Ensure 'uploads' directory exists on server start
    console.log(`Server running on http://localhost:${PORT}`);
});
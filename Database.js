import mysql from 'mysql2';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config(); // Load environment variables from .env file

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();

// --- Database Connection Test (IMPORTANT FOR DEBUGGING) ---
async function testDbConnection() {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS solution');
        console.log('Database connection successful! Solution:', rows[0].solution);
    } catch (error) {
        console.error('Database connection FAILED:', error.message);
        console.error('Please check your .env file credentials (MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE).');
        console.error('Also ensure your MySQL server is running and accessible.');
        // Optionally, you might want to exit the application if a DB connection is essential for startup:
        // process.exit(1);
    }
}
testDbConnection(); // Call the test function when Database.js is loaded
// --- END Database Connection Test ---


export async function createNote(
    title, listing_type, housing_type, campus, bedrooms, bathrooms,
    square_footage, address, postal_code,
    property_description, // <-- Parameter is correctly defined here
    image_url, price,
    agent_name, agent_email, agent_phone
) {
    const [result] = await pool.query(`
        INSERT INTO listings
        (title, listing_type, housing_type, campus, bedrooms, bathrooms, square_footage, Address, Postal_Code, Property_description, image_url, price, agent_name, agent_email, agent_phone, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `, [
        title, listing_type, housing_type, campus, bedrooms, bathrooms,
        square_footage, address, postal_code,
        property_description, // <-- Value is correctly passed here
        image_url, price,
        agent_name, agent_email, agent_phone
    ]);

    return result;
}

// Function to get all listings
export async function getAllListings() {
    const [rows] = await pool.query(`SELECT * FROM listings ORDER BY created_at DESC`);
    return rows;
}

// Function to get a single listing by ID
export async function getListingById(id) {
    const [rows] = await pool.query(`SELECT * FROM listings WHERE id = ?`, [id]);
    return rows[0]; // Return the first (and only) row if found
}

// Register user
export async function registerUser(full_name, email, password) {
    const password_hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(`
        INSERT INTO users (full_name, email, password_hash, created_at)
        VALUES (?, ?, ?, NOW())
    `, [full_name, email, password_hash]);
    return result;
}

// Login user
export async function loginUser(email, password) {
    const [rows] = await pool.query(`
        SELECT * FROM users WHERE email = ?
    `, [email]);

    if (rows.length === 0) {
        return { success: false, message: 'User not found' };
    }

    const user = rows[rows.length - 1]; // In case multiple users with same email, get the latest
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
        return { success: false, message: 'Invalid password' };
    }

    return { success: true, user }; // Return the user object upon successful login
}
# York Realty

York Realty is a housing listings site for York University students. Visitors can browse property listings and details, register or log in, and submit a listing with an image.

## Features

- Browse listings and view property details
- Create listings with property and agent information
- Register and log in with passwords stored as bcrypt hashes
- Upload listing images (JPEG, JPG, PNG, or GIF, up to 5 MB)
- English and French interface translations

## Requirements

- Node.js and npm
- A MySQL server and a database with the `users` and `listings` tables expected by the application

## Setup

1. Clone the repository and enter the project directory.

   ```bash
   git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
   cd YOUR-REPOSITORY
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with your MySQL connection details:

   ```dotenv
   MYSQL_HOST=localhost
   MYSQL_USER=your_mysql_username
   MYSQL_PASSWORD=your_mysql_password
   MYSQL_DATABASE=your_database_name
   PORT=8080
   ```

   Keep `.env` private; it is excluded from Git. The database must already exist and include `users` and `listings` tables with the columns used in `Database.js`.

4. Start the API server.

   ```bash
   npm run dev
   ```

   The server listens at `http://localhost:8080` by default. Set `PORT` in `.env` to use a different port.

5. Open `index.html` in a local web server (for example, VS Code Live Server). The browser pages call the API at `http://localhost:8080`.

## API routes

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/listings` | Get all listings |
| `GET` | `/listings/:id` | Get one listing |
| `POST` | `/listings` | Create a listing; send multipart form data with the image in `image_file` |
| `POST` | `/register` | Register a user with `full_name`, `email`, and `password` |
| `POST` | `/login` | Log in with `email` and `password` |

Uploaded images are stored in `uploads/` and served from `/uploads`.

## Project files

- `app.js` — Express API and image upload handling
- `Database.js` — MySQL connection and database queries
- `script.js` — Frontend behavior and API requests
- `translations.js` — Interface translations
- `*.html` and `style.css` — Website pages and styling

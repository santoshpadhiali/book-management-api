# Book Management REST API

A Node.js REST API for managing books using TypeScript, Express, and MVC architecture.

## Features

- CRUD operations for books
- Bulk import from CSV
- TypeScript for type safety
- Morgan for logging
- Centralized error handling
- Unit tests with Jest
- Environment variables

## Installation

1. Clone the repository
2. Navigate to the Backend directory
3. Run `npm install`

## Usage

1. Create a `.env` file with `PORT=3000`
2. Run `npm run dev` for development
3. Run `npm run build` and `npm start` for production

## API Endpoints

- GET /api/books - Get all books
- GET /api/books/:id - Get book by ID
- POST /api/books - Add a new book
- PUT /api/books/:id - Update a book
- DELETE /api/books/:id - Delete a book
- POST /api/books/import - Import books from CSV

## Testing

Run `npm test` to execute unit tests.

## Postman Collection

Import the collection from `postman_collection.json` (not included, create your own).
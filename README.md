# Inventory and Data Management System

A REST API for managing product inventory, built with Node.js, Express, and MongoDB (Mongoose).

## Setup

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and set your MongoDB URI.
3. Start the server: `npm start` (runs on port 5000)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/products | Create a product |
| GET | /api/products | List products (filter, sort, paginate) |
| GET | /api/products/low-stock | Products where quantity <= reorderLevel |
| GET | /api/products/summary | Category-wise aggregation summary |
| GET | /api/products/:id | Get one product |
| PUT | /api/products/:id | Update product (partial body allowed) |
| DELETE | /api/products/:id | Delete a product |
| PATCH | /api/products/:id/stock | Adjust stock with `{ "change": number }` |

## Query Parameters (GET /api/products)

`category`, `minPrice`, `maxPrice`, `search`, `sort`, `order` (asc/desc), `page`, `limit`

## Screenshots

<!-- Add your screenshot images here after testing -->

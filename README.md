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

<img width="1415" height="953" alt="image" src="https://github.com/user-attachments/assets/b5eb4d3a-ab79-4523-8e8c-cd4ab406a13b" />
<img width="1407" height="981" alt="image" src="https://github.com/user-attachments/assets/3a483d38-9539-4653-ac0e-a68efcf90c1f" />
<img width="1426" height="877" alt="image" src="https://github.com/user-attachments/assets/9c54c692-c0f4-4e81-b43d-e97af204c57a" />
<img width="1407" height="755" alt="image" src="https://github.com/user-attachments/assets/2c4fc8db-5706-4f27-bea8-9a17175a3575" />









require('dotenv').config();
const express = require('express');
const productRoutes = require('./src/routes/productRoutes');
const { notFound, errorHandler } = require('./src/middleware/errorHandler');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Inventory and Data Management System API is running' });
});

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

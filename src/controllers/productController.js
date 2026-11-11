const Product = require('../models/Product');
const AppError = require('../middleware/errorHandler').AppError;

const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
    }
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { sku: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const sortField = req.query.sort || 'createdAt';
    const sortOrder = req.query.order === 'asc' ? 1 : -1;
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50);
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find(filter).sort({ [sortField]: sortOrder }).skip(skip).limit(limit),
      Product.countDocuments(filter)
    ]);

    res.status(200).json({
      total,
      page,
      totalPages: Math.ceil(total / limit) || 1,
      count: products.length,
      products
    });
  } catch (err) {
    next(err);
  }
};

const getLowStock = async (req, res, next) => {
  try {
    const lowStockItems = await Product.find({
      $expr: { $lte: ['$quantity', '$reorderLevel'] }
    }).sort({ quantity: 1 });

    res.status(200).json({
      count: lowStockItems.length,
      lowStockItems
    });
  } catch (err) {
    next(err);
  }
};

const getSummary = async (req, res, next) => {
  try {
    const summary = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          totalItems: { $sum: 1 },
          totalQuantity: { $sum: '$quantity' },
          totalStockValue: { $sum: { $multiply: ['$price', '$quantity'] } },
          avgPrice: { $avg: '$price' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({
      categories: summary.length,
      summary
    });
  } catch (err) {
    next(err);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return next(new AppError(404, 'Product not found'));
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    // remove _id from body to prevent overwrite
    const { _id, ...updateData } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return next(new AppError(404, 'Product not found'));
    Object.assign(product, updateData);
    const updated = await product.save();
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return next(new AppError(404, 'Product not found'));
    res.status(200).json({ message: 'Product deleted', id: product.id });
  } catch (err) {
    next(err);
  }
};

const updateStock = async (req, res, next) => {
  try {
    const { change } = req.body;

    if (change === undefined || change === null) {
      return next(new AppError(400, 'change is required'));
    }
    if (!Number.isInteger(change)) {
      return next(new AppError(400, 'change must be an integer'));
    }
    if (change === 0) {
      return next(new AppError(400, 'change must be non-zero'));
    }

    // atomic update: only proceed if quantity won't go negative
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, $expr: { $gte: [{ $add: ['$quantity', change] }, 0] } },
      { $inc: { quantity: change } },
      { new: true }
    );

    if (!product) {
      const exists = await Product.exists({ _id: req.params.id });
      if (!exists) return next(new AppError(404, 'Product not found'));
      return next(new AppError(400, 'Insufficient stock'));
    }

    res.status(200).json({ message: 'Stock updated', product });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getLowStock,
  getSummary,
  getProductById,
  updateProduct,
  deleteProduct,
  updateStock
};

const Product = require('../models/productModel');

exports.getProducts = async (category) => {
  const query = category ? { category } : {};
  return Product.find(query);
};

exports.createProduct = async (data, isAdmin) => {
  if (!isAdmin) throw new Error('Admin access required');
  const product = new Product(data);
  return product.save();
};

exports.updateProduct = async (productId, data, isAdmin) => {
  if (!isAdmin) throw new Error('Admin access required');
  return Product.findByIdAndUpdate(productId, data, { new: true });
};

exports.deleteProduct = async (productId, isAdmin) => {
  if (!isAdmin) throw new Error('Admin access required');
  return Product.findByIdAndDelete(productId);
};
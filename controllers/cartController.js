const CartItem = require('../models/cartItemModel');
const Product = require('../models/productModel');

exports.addToCart = async (userId, productId, quantity) => {
  const product = await Product.findById(productId);
  if (!product || product.stock < quantity) throw new Error('Product unavailable');
  
  let cartItem = await CartItem.findOne({ userId, productId });
  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cartItem = new CartItem({ userId, productId, quantity });
  }
  return cartItem.save();
};
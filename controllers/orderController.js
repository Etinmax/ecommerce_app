const Order = require('../models/orderModel');
const OrderItem = require('../models/orderItemModel');
const CartItem = require('../models/cartItemModel');
const Product = require('../models/productModel');

exports.checkout = async (userId) => {
  const cartItems = await CartItem.find({ userId });
  if (!cartItems.length) throw new Error('Cart is empty');

  let total = 0;
  const order = new Order({ userId, total: 0 });
  await order.save();
  
  for (const item of cartItems) {
    const product = await Product.findById(item.productId);
    total += product.price * item.quantity;
    await OrderItem.create({
      orderId: order._id,
      productId: item.productId,
      quantity: item.quantity,
      price: product.price,
    });
    product.stock -= item.quantity;
    await product.save();
    await CartItem.deleteOne({ _id: item._id });
  }
  order.total = total;
  await order.save();
  return order;
};

exports.getOrders = async (userId, isAdmin) => {
  const query = isAdmin ? {} : { userId };
  return Order.find(query).populate('userId', 'email');
};

exports.updateOrderStatus = async (orderId, status, isAdmin) => {
  if (!isAdmin) throw new Error('Admin access required');
  return Order.findByIdAndUpdate(orderId, { status }, { new: true });
};
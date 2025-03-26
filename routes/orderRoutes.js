const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/checkout', authMiddleware, async (req, res) => {
  try {
    const order = await orderController.checkout(req.user.id);
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await orderController.getOrders(req.user.id, req.user.isAdmin);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put('/:id/status', authMiddleware, async (req, res) => {
    try {
      const order = await orderController.updateOrderStatus(req.params.id, req.body.status, req.user.isAdmin);
      if (!order) return res.status(404).json({ message: 'Order not found' });
      res.json(order);
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  });
  
  module.exports = router;
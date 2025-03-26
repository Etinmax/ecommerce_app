const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, async (req, res) => {
  try {
    const cartItem = await cartController.addToCart(req.user.id, req.body.productId, req.body.quantity);
    res.json(cartItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
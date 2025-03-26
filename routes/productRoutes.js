const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
  try {
    const products = await productController.getProducts(req.query.category);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const product = await productController.createProduct(req.body, req.user.isAdmin);
    res.status(201).json(product);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const product = await productController.updateProduct(req.params.id, req.body, req.user.isAdmin);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
});
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
      const product = await productController.deleteProduct(req.params.id, req.user.isAdmin);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.json({ message: 'Product deleted' });
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  });
  
  module.exports = router;
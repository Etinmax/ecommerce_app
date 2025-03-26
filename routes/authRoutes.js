const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', async (req, res) => {
  try {
    const user = await authController.register(req.body.email, req.body.password);
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const token = await authController.login(req.body.email, req.body.password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;

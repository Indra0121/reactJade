const express = require('express');
const router = express.Router();
const userController = require('../controllers/User');

// GET all users
router.get('/users', userController.getAllUsers);

// GET a specific user by ID
router.get('/users/:id', userController.getOneUser);

// PUT update a specific user by ID
router.put('/users/:id', userController.updateOneUser);

// DELETE a specific user by ID
router.delete('/users/:id', userController.deleteUser);

// POST create a new user
router.post('/users', userController.createUser);

module.exports = router;

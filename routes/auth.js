const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require("express-validator");

// Register a new user
router.post('/',
    [
        check('email', 'El email no es válido').isEmail(),
        check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    ],  
    authController.authenticateUser
);

module.exports = router;
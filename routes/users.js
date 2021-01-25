const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require("express-validator");

// Register a new user
router.post('/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email no es válido').isEmail(),
        check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    ],  
    userController.createUser
);

module.exports = router;
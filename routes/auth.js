const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require("express-validator");
const auth = require('../middleware/auth');

router.post('/',
    [
        check('email', 'El email no es válido').isEmail(),
        check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    ],  
    authController.authenticateUser
);

router.get('/',
    auth,
    authController.getUserInfo
);

module.exports = router;
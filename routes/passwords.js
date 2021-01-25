const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwordController');
const { check } = require("express-validator");
const auth = require('../middleware/auth');

// Save a new password 
router.post('/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
    ],  
    auth,
    passwordController.createPassword
);

router.get('/',
    auth,
    passwordController.getPasswords
);

router.put('/:id',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
    ],  
    auth,
    passwordController.updatePassword
);

router.delete('/:id',
    auth,
    passwordController.deletePassword
);

module.exports = router;
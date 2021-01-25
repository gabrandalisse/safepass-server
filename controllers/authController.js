const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.authenticateUser = async (req, res) => {

    // Check for express-validator errors 
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() });
    };
  
    // Get email and pass from req
    const { email, password } = req.body;

    try {
        // Search for a registered email
        let user = await User.findOne({ email });
        if( !user ) {
            return res.status(400).json({ msg: 'El usuario no existe' });
        };

        // If the user exist, check the password
        const rigthPass = await bcryptjs.compare(password, user.password);
        if( !rigthPass ) {
            return res.status(400).json({ msg: 'Contraseña incorrecta' });
        };

        // If everything looks good, create the JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        // Sign the JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, ( error, token ) => {
            if( error ) throw error;

            // Confirmation msg
            res.json({ token });
        });

    } catch (error) {
        console.log(error);
    }
}

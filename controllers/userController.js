const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
    
    // Check for express-validator errors 
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() });
    };

    // Destructuring req.body
    const { email, password } = req.body;

    try {
        // Check if the user already exist
        let user = await User.findOne({ email });
        
        if(user) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        };

        // If the user doesn't exist then create it
        user = new User(req.body);

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        // Save the user in the DB
        await user.save();

        // Create the JWT
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
        res.status(400).send("Hubo un error");
    }
};
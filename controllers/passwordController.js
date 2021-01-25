const { validationResult } = require('express-validator');
const Password = require('../models/Password');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SECRET_CRYPT);

exports.createPassword = async (req, res) => {
    
    // Check for express-validator errors 
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() });
    };
  
    try {
        // Create the password
        const pass = new Password(req.body);

        // Save the creator by JWT
        pass.creator = req.user.id;

        // Encrypt the pass to save
        pass.password = cryptr.encrypt(pass.password);

        // Save the pass
        pass.save();
        res.json({ pass });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    };
};

exports.getPasswords = async (req, res) => {
    try {
        const passwords = await Password.find({ creator: req.user.id });
        
        // Decrtpy the pass from the DB
        passwords.map( pass => (
            pass.password = cryptr.decrypt(pass.password)
        ));

        res.json({ passwords });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    };
};

exports.updatePassword = async (req, res) => {
    
    // Check for express-validator errors 
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() });
    }; 

    // Destructuring password data
    const { name, password } = req.body;
    const newPassword = {};

    if( name ) {
        newPassword.name = name;
    };
    
    if( password ) {
        newPassword.password = cryptr.encrypt(password);
    };

    try {
        // Check the pass ID
        let pass = await Password.findById( req.params.id );

        // If the pass exists
        if( !pass ) {
            return res.status(404).json({ msg: 'Contraseña no encontrada' });
        };

        // Verify the creator of the pass
        if( pass.creator.toString() !== req.user.id ) {
            return res.status(401).json({ msg: 'No autorizado' });
        };

        // Update pass
        pass = await Password.findOneAndUpdate({ _id: req.params.id }, { $set: newPassword }, { new: true });
        res.json({ pass });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    };
};

exports.deletePassword = async (req, res) => {
    try {
        // Check the pass ID
        let pass = await Password.findById( req.params.id );

        // If the pass exists
        if( !pass ) {
            return res.status(404).json({ msg: 'Contraseña no encontrada' });
        };

        // Verify the creator of the pass
        if( pass.creator.toString() !== req.user.id ) {
            return res.status(401).json({ msg: 'No autorizado' });
        };

        // Delete the pass
        await Password.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Contraseña eliminada' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    };
};
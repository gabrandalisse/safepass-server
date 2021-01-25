const mongoose = require('mongoose');

const PasswordSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String, 
        required: true,
        trim: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'    
    }
});

module.exports = mongoose.model('Password', PasswordSchema);
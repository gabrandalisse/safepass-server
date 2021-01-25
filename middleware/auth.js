const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
   
    // Read the header from the token
    const token = req.header('x-auth-token');

    // Check if exist the token
    if( !token ) {
        return res.status(401).json({ msg: 'No hay Token, permiso no válido' });
    }

    // Validate the token
    try {
        const cypher = jwt.verify(token, process.env.SECRET);
        req.user = cypher.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token no válido' });
    }
}
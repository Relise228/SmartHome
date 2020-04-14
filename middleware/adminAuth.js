const jwt = require('jsonwebtoken');
const config = require('config');

const Client = require('../models/Client');

module.exports = async function(req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        const user = await Client.findById(decoded.client.id).select('type');
        if (user.type !== "Admin") {
            return res.json({ msg: 'Wrong user type' });
        }
        req.client = decoded.client;
        next();
    } catch (err) {
        res.json({ msg: 'Token is not valid'});
    }
}
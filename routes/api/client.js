const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const Client = require('../../models/Client');
const Order = require('../../models/Order');

// @route    POST api/clients
// @desc     Add new client
// @access   Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min:6 }),
    check('telephoneNumber', 'Please enter a valid telephone number').isMobilePhone(),
    check('email', 'Please enter a valid email').isEmail()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() });
    }

    const {name, password, telephoneNumber, email} = req.body;

    try {
        let user = await Client.findOne({ email });

        if (user) {
           return res.json({ errors: [{ msg: 'User already exists' }] });
        }
        
        user = new Client({
            name,
            password,
            telephoneNumber,
            email
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const counter = await SystemCounter.findOne({ target: 'order'});
        const cart = new Order ({
            client: user.id,
            number: counter.count
        })
        await cart.save();
        counter.count += 1;
        await counter.save();

        const payload = {
            client: {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
    
});

module.exports = router;
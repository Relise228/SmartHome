const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const Client = require('../../models/Client');
const Home = require('../../models/Home');

// @route    GET api/auth
// @desc     Test route
// @access   Public
router.get('/', auth, async (req, res) => {
    try {
        const client = await Client.findById(req.client.id).populate('home').select('-password');
        res.json(client);
    } catch(err) {
        console.error(err.message);
        res.status(500).status('Server Error');
    }
});

// @route    POST api/auth
// @desc     Authenticate client & get token
// @access   Public
router.post('/', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() });
    }

    const {password, email} = req.body;

    try {
        let user = await Client.findOne({ email });

        if (!user) {
           return res
           .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
        
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
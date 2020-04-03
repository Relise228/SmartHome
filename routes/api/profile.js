const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Client = require('../../models/Client');
const Home = require('../../models/Home');

// @route    POST api/profile/pib
// @desc     Change profile pib
// @access   Private
router.post('/pib',
 [ 
    auth, 
    [
        check('name', 'Name is required').not().isEmpty()
    ]
], 
async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { name } = req.body;
        const updatedClient = await Client.findByIdAndUpdate(req.client.id, { name: name});
        res.json(updatedClient.name);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    POST api/profile/telephone
// @desc     Change profile telephone number
// @access   Private
router.post('/telephone',
 [ 
    auth, 
    [
        check('telephoneNumber', 'Please enter a valid telephone number').isMobilePhone()
    ]
], 
async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { telephoneNumber } = req.body;
        const updatedClient = await Client.findByIdAndUpdate(req.client.id, { telephoneNumber: telephoneNumber});
        res.json(updatedClient.telephoneNumber);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    POST api/profile/email
// @desc     Change profile email
// @access   Private
router.post('/email',
 [ 
    auth, 
    [
        check('email', 'Please enter a valid email').isEmail()
    ]
], 
async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email } = req.body;
        const updatedClient = await Client.findByIdAndUpdate(req.client.id, { email: email});
        res.json(updatedClient.email);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    POST api/profile/home
// @desc     Add\change user home
// @access   Private
router.post('/home',
 [
    auth, 
    [
        check('homeType', 'Home type is required').not().isEmpty(),
        check('homeSize', 'Home size is required').not().isEmpty(),
        check('roomsNumber', 'Rooms number is required').not().isEmpty()
    ]
], 
async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { homeType, homeSize, roomsNumber } = req.body;
        const client = await Client.findById(req.client.id);
        if (client.home) {
            await Home.findByIdAndUpdate(client.home, { homeType: homeType, homeSize: homeSize, roomsNumber: roomsNumber});
            const updatedHome = await Home.findById(client.home);
            res.json(updatedHome);
        } else {
            const home = new Home ({
                homeType,
                homeSize,
                roomsNumber
            });
            await home.save();
            await Client.findByIdAndUpdate(req.client.id, { home: home.id });
            res.json(home);
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    GET api/profile/home
// @desc     Get user home
// @access   Private
router.get('/home', auth, async(req, res) => {
    try {
        const user = await Client.findById(req.client.id).populate('home');
        res.json(user.home);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
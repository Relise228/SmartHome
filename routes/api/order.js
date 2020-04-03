const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Order = require('../../models/Order');

// @route    GET api/order
// @desc     Get all orders that not cart
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const orders = await Order.find({client : req.client.id, status : { $ne: 'Cart' }})
        .populate({
            path: 'products',
            populate: { path: 'product' }
        })
        .sort('date');
        res.json(orders);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route    GET api/order/:id
// @desc     Get one order
// @access   Private
router.get('/:id', auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        .populate({
            path: 'products',
            populate: { path: 'product' }
        });
        res.json(order);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

module.exports = router;
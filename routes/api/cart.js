﻿const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Order = require('../../models/Order');
const ProductInOrder = require('../../models/ProductInOrder');
const SmartHomeSystem = require('../../models/SmartHomeSystem');

// @route    Get api/cart
// @desc     Get user cart
// @access   Private

router.get('/', auth, async (req, res) => {
    try {
        const { adress } = req.body;
        const cart = await Order.findOne({client : req.client.id, status : 'Cart'})
        .populate({
            path: 'products',
            populate: { path: 'product' }
        });
        if (!cart) {
            res.status(404).json({ msg: 'Cart not found'});
        }

        res.json(cart);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route    POST api/cart/confirm
// @desc     Confirm cart into order
// @access   Private

router.post('/confirm', auth, async (req, res) => {
    try {
        const { adress } = req.body;
        const cart = await Order.findOne({client : req.client.id, status : 'Cart'});
        if (!cart) {
            res.json({ msg: 'Cart not found'});
        }

        cart.adress = adress;
        cart.date = Date.now();
        cart.status = 'Confirmed';
        await cart.save();

        const newCart = new Order ({
            client: req.client.id
        });
        await newCart.save();

        res.json(newCart);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route    POST api/cart/change
// @desc     Change value of the position in cart
// @access   Private

router.post('/change', auth, async (req, res) => {
    try {
        const { productInOrderId, quantity } = req.body;
        await ProductInOrder.findByIdAndUpdate(productInOrderId, { quantity: quantity});
        const cart = await Order.findOne({client : req.client.id, status : 'Cart'})
        .populate({
            path: 'products',
            populate: { path: 'product' }
        });
        if (!cart) {
            res.json({ msg: 'Cart not found'});
        }

        cart.totalPrice = calculateOrderPrice(cart.products);
        await cart.save();

        res.json(cart);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route    POST api/cart/delete
// @desc     Delete position in cart
// @access   Private

router.post('/delete', auth, async (req, res) => {
    try {
        const { productInOrderId } = req.body;
        
        await ProductInOrder.findByIdAndDelete(productInOrderId, { quantity: quantity});

        const cart = await Order.find({client : req.client.id, status : 'Cart'})
        .populate({
            path: 'products',
            populate: { path: 'product' }
        });
        if (!cart) {
            res.status(404).json({ msg: 'Cart not found'});
        }

        cart.totalPrice = calculateOrderPrice(cart.products);
        await cart.save();

        res.json(cart);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})



// @route    POST api/cart
// @desc     Add new position to cart
// @access   Private

router.post('/', auth, async (req, res) => {
    try {
        const {systemId, quantity} = req.body;
        const cart = await Order.findOne({client : req.client.id, status : 'Cart'})
        .populate({
            path: 'products',
            populate: { path: 'product' }
        });
        if (!cart) {
            res.json({ msg: 'Cart not found'});
        }
        const systemInCart = cart.products.find(system => system.product.id == systemId);
        if (systemInCart) {
            const updatedSystemInCart = await ProductInOrder.findByIdAndUpdate(systemInCart.id, { quantity: systemInCart.quantity + quantity});
            console.log(updatedSystemInCart);
            const cart = await Order.findOne({client : req.client.id, status : 'Cart'})
            .populate({
                path: 'products',
                populate: { path: 'product' }
            });
            cart.totalPrice = calculateOrderPrice(cart.products);
            await cart.save();
            res.json(cart);
        } else {
            const newSystemInCart = new ProductInOrder ({
                product: systemId,
                quantity
            });
            await newSystemInCart.save();
            const updatedCart = await Order.findOneAndUpdate({client : req.client.id, status : 'Cart'}, { $push: {products: newSystemInCart.id}})
            .populate({
                path: 'products',
                populate: { path: 'product' }
            });
            updatedCart.totalPrice = calculateOrderPrice(updatedCart.products);
            await updatedCart.save();
            res.json(updatedCart);
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

module.exports = router;

var calculateOrderPrice = function(products) {
    let price = 0;
    products.forEach(element => {
        let basePrice = element.product.price;
        let discount = 1 - element.product.discount / 100;
        let quantity = element.quantity;
        price += (basePrice * discount) * quantity;
    });
    return price;
};
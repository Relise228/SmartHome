const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const SmartHomeSystem = require('../../models/SmartHomeSystem');
const Review = require('../../models/Review');
const Order = require('../../models/Order');
const Client = require('../../models/Client');


// @route    GET api/goods
// @desc     Get all systems
// @access   Public
router.get('/', async (req, res) => {
    var url = req.query;

    var filter = {};
    var finalQuery = {};
    if (url.manufacturer) {
        filter.manufacturer = url.manufacturer;
    }
    
    if (url.priceFrom || url.priceTo) {
        if (!url.priceFrom) filter.priceFrom = 0;
        else filter.priceFrom = parseInt(url.priceFrom);
        if (!url.priceTo) filter.priceTo = 99999;
        else filter.priceTo = parseInt(url.priceTo);
    }
    
    if (url.order != 'none') {
        filter.order = url.order;
    }

    try {
        if (filter.manufacturer) {
            finalQuery = { manufacturer : { $in : filter.manufacturer}}
        }
        const systems = await SmartHomeSystem.find(finalQuery);
        let result = [];
        
        systems.forEach(system => {
            if (url.priceFrom || url.priceTo) {
                let sortPrice = system.price * (1 - system.discount / 100);
                if (sortPrice >= filter.priceFrom && sortPrice <= filter.priceTo) {
                    result.push(system);
                }
            } else {
                result.push(system);
            }
        });
        if (filter.order == 'price') {
            result.sort(function(a, b) {
                return a.price * (1 - a.discount / 100) - b.price * (1 - b.discount / 100);
            })
        } else if (filter.order == '-price') {
            result.sort(function(a, b) {
                return b.price * (1 - b.discount / 100) - a.price * (1 - a.discount / 100);
            })
        }
        res.json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route    GET api/goods/:id
// @desc     Get one system
// @access   Public
router.get('/:id', async (req, res) => {
    try {
        const system = await SmartHomeSystem.findById(req.params.id);
        
        if (!system) {
            return res.json({ msg: 'System not found'});
        }

        const reviews = await Review.find({product: req.params.id}).populate('client', 'name').sort('date');
        const systemWithReviews = {
            system: system,
            reviews: reviews
        }
        res.json(systemWithReviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
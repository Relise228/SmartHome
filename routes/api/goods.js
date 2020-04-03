const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const SmartHomeSystem = require('../../models/SmartHomeSystem');

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

    if (filter.manufacturer && filter.priceTo) {
        finalQuery = {
            $and : [
                { price : { $gte : filter.priceFrom, $lte : filter.priceTo }},
                { manufacturer : { $in : filter.manufacturer}}
            ]
        };
    } else if (filter.manufacturer) {
        finalQuery = { manufacturer : { $in : filter.manufacturer}};
    } else if (filter.priceTo) {
        finalQuery = { price : { $gte : filter.priceFrom, $lte : filter.priceTo }}
    }

    try {
        
        const systems = await SmartHomeSystem.find( 
            finalQuery
        ).sort(filter.order == 'none' ? {} : filter.order);
        res.json(systems);
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
            return res.status(404).json({ msg: 'System not found'});
        }

        res.json(system);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route    POST api/goods/
// @desc     Add system
// @access   Private
router.post(
    '/', 
    [
        auth,
        [
            check('title', 'Title is required').not().isEmpty(),
            check('manufacturer', 'Manufacturer is required').not().isEmpty(),
            check('images', 'Images is required').not().isEmpty(),
            check('quantity', 'Quantity is required').not().isEmpty(),
            check('description', 'Description is required').not().isEmpty(),
            check('wirelessStandart', 'Wireless standart is required').not().isEmpty(),
            check('controlOption', 'Control option is required').not().isEmpty(),
            check('warrantyPeriod', 'Warranty period is required').not().isEmpty(),
            check('price', 'Price is required').not().isEmpty()
        ]
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const {title, manufacturer, images, quantity, description, wirelessStandart, controlOption, warrantyPeriod, price} = req.body;
            let system = new SmartHomeSystem ({
                title,
                manufacturer,
                quantity,
                images,
                description,
                wirelessStandart,
                controlOption,
                warrantyPeriod,
                controlOption,
                warrantyPeriod,
                price
            });

            await system.save();
            res.json(system);
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
});

module.exports = router;
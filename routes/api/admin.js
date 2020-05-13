const express = require('express');
var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')
const router = express.Router();
const auth = require('../../middleware/adminAuth');
//const upload = require('../../services/file-upload');
const { check, validationResult } = require('express-validator');

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });



const SmartHomeSystem = require('../../models/SmartHomeSystem');
const SystemCounter = require('../../models/SystemCounter');
const LastSystem = require('../../models/LastSystem');
const Order = require('../../models/Order');


const config = {
    secretAccessKey: 'eWdjz2Av7iF4AxIRU+o4csRoPoVUP0Jy6Y/SLgZD',
    accessKeyId: 'AKIAJ7AEHAQJZUKDXNNA',
    region: 'eu-central-1'
}


// @route    POST api/admin/system/image
// @desc     Upload image to system
// @access   Private
router.post("/system/image", [auth ,upload.single("image")], async function(req, res) {
    const lastSystem = await LastSystem.findOne({ admin: req.client.id });
    const file = req.file;
  
    let s3bucket = new aws.S3({
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
      region: config.region
    });
  
    var params = {
      Bucket: 'smarthomeproject',
      Key: lastSystem.system + '/' + file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read"
    };
  
    s3bucket.upload(params, async function(err, data) {
      if (err) {
        res.status(500).json({ error: true, Message: err });
      } else {
        const system = await SmartHomeSystem.findById(lastSystem.system);
        system.images.push(req.file.originalname);
        await system.save();
        return res.json({'imageUrl': data.Location});
        }
    })
});



// @route    POST api/admin/system/deleteImage
// @desc     Delete image
// @access   Private
router.post('/system/deleteImage', auth, async(req, res) => {
    try {
        const { image, systemId } = req.body;
        const system = await SmartHomeSystem.findById(systemId);
        const index = system.images.indexOf(image);
        if (index != -1) {
            system.images.splice(index, 1);
            await system.save();
            res.json(system);
        } else {
            res.json({ errors: [{ msg: 'Image not found' }] });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    POST api/admin/system/setStatus
// @desc     Set system status
// @access   Private
router.post('/system/setStatus', auth, async(req, res) => {
    try {
        const { status, systemId } = req.body;
        const system = await SmartHomeSystem.findById(systemId);
        system.status = status;
        await system.save();
        res.json(system);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    POST api/admin/system/set
// @desc     Set the last system id
// @access   Private
router.post('/system/setId', auth, async (req, res) => {
    try {
        const { systemId } = req.body;
        const lastSystem = await LastSystem.findOne({ admin : req.client.id });
        if (!lastSystem) {
            const newLastSystem = new LastSystem({
                admin: req.client.id,
                system: systemId
            });
            await newLastSystem.save();
            res.json(newLastSystem);
        } else {
            lastSystem.system = systemId;
            await lastSystem.save();
            res.json(lastSystem);
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// @route    POST api/admin/system/title
// @desc     Set system title
// @access   Private
router.post('/system/title', auth, async (req, res) => {
    try {
        const { title, systemId } = req.body;
        const system = await SmartHomeSystem.findById(systemId);
        system.title = title;
        await system.save();
        res.json(system);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    POST api/admin/system/price
// @desc     Set system price
// @access   Private
router.post('/system/price', auth, async (req, res) => {
    try {
        const { price, systemId } = req.body;
        const system = await SmartHomeSystem.findById(systemId);
        system.price = price;
        await system.save();
        res.json(system);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    POST api/admin/system/discount
// @desc     Set system discount
// @access   Private
router.post('/system/discount', auth, async (req, res) => {
    try {
        const { discount, systemId } = req.body;
        const system = await SmartHomeSystem.findById(systemId);
        system.discount = discount;
        await system.save();
        res.json(system);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    POST api/admin/system/description
// @desc     Set system description
// @access   Private
router.post('/system/description', auth, async (req, res) => {
    try {
        const { description, systemId } = req.body;
        const system = await SmartHomeSystem.findById(systemId);
        system.description = description;
        await system.save();
        res.json(system);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    POST api/admin/system/quantity
// @desc     Set system quantity
// @access   Private
router.post('/system/quantity', auth, async (req, res) => {
    try {
        const { quantity, systemId } = req.body;
        const system = await SmartHomeSystem.findById(systemId);
        system.quantity = quantity;
        await system.save();
        res.json(system);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    GET api/admin/orders/confirmed
// @desc     Get all confirmed orders
// @access   Private
router.get('/orders/confirmed', auth, async (req, res) => {
    try {
        const orders = await Order.find({ status: 'Confirmed' })
        .populate('client', '-password')
        .populate('products')
        .sort('date');
        res.json(orders);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    GET api/admin/orders/delivery
// @desc     Get all delivery orders
// @access   Private
router.get('/orders/delivery', auth, async (req, res) => {
    try {
        const orders = await Order.find({ status: 'In delivery' })
        .populate('client', '-password')
        .populate('products')
        .sort('date');
        res.json(orders);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    GET api/admin/orders/finished
// @desc     Get all confirmed orders
// @access   Private
router.get('/orders/finished', auth, async (req, res) => {
    try {
        const orders = await Order.find({ status: 'Finished' })
        .populate('client')
        .populate('products')
        .sort('date');
        res.json(orders);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    GET api/admin/orders/:number
// @desc     Get order information
// @access   Private
router.get('/orders/:number', auth, async (req, res) => {
    try {
        const order = await Order.findOne({ number: req.params.number })
        .populate('client', '-password')
        .populate('products')
        .sort('date');
        res.json(order);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    POST api/admin/orders/toDelivery
// @desc     Change confirmed order to delivery
// @access   Private
router.post('/orders/toDelivery', auth, async (req, res) => {
    try {
        const { orderId } = req.body;
        const order = await Order.findById( orderId );
        order.status = 'In delivery';
        await order.save();
        res.json(order);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// @route    POST api/admin/system/visible
// @desc     Add system
// @access   Private
router.post('/system/notVisible', auth, async (req, res) => {
    try {
        const { systemId } = req.body;
        const system = await SmartHomeSystem.findById( systemId );
        system.status = "Not Visible";
        await system.save();
        res.json(system);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// @route    POST api/admin/system/visible
// @desc     Add system
// @access   Private
router.post('/system/visible', auth, async (req, res) => {
    try {
        const { systemId } = req.body;
        const system = await SmartHomeSystem.findById( systemId );
        system.status = "Visible";
        await system.save();
        res.json(system);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});



// @route    POST api/admin/system
// @desc     Add system
// @access   Private
router.post(
    '/system', 
    [
        auth,
        [
            check('title', 'Title is required').not().isEmpty(),
            check('manufacturer', 'Manufacturer is required').not().isEmpty(),
            check('quantity', 'Quantity is required').not().isEmpty(),
            check('description', 'Description is required').not().isEmpty(),
            check('price', 'Price is required').not().isEmpty()
        ]
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() });
        }
        try {
            const {title, manufacturer, quantity, description, price, discount} = req.body;
            const counter = await SystemCounter.findOne({ target: 'system'});
            let system = new SmartHomeSystem ({
                title,
                manufacturer,
                code: counter.count,
                quantity,
                description,
                price,
                discount
            });

            counter.count += 1;
            await counter.save();

            await system.save();
            res.json(system);
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
});








router.get('/counter/system', async (req, res) => {
    const systemCounter = new SystemCounter();
    await systemCounter.save();
    res.json(systemCounter);
})

router.get('/counter/order', async (req, res) => {
    const systemCounter = new SystemCounter({
        target: 'order',
        count: 1
    });
    await systemCounter.save();
    res.json(systemCounter);
})

module.exports = router;
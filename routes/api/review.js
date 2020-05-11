const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Review = require('../../models/Review');


// @route    POST api/review
// @desc     Add review
// @access   Private
router.post(
    '/', 
    [
        auth,
        [
            check('text', 'Text is required').not().isEmpty(),
            check('rating', 'Rating is required').not().isEmpty(),
        ]
    ], 
    async (req, res) => {
        try {
            const { product, text, rating } = req.body;
            const oldReview = await Review.findOne({client: req.client.id, product: product});
            if (oldReview) {
                oldReview.text = text;
                oldReview.rating = rating;
                oldReview.date = Date.now();
                const newReview = await oldReview.save();
                res.json(newReview);
            } else {
                const newReview = new Review({
                    client: req.client.id,
                    product: product,
                    text: text,
                    rating: rating
                });
                res.json(await newReview.save());
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
});


module.exports = router;
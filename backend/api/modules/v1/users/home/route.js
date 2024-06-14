var express = require('express');
var router = express.Router();
var home_model = require("./home_model");
var common = require("../../../../config/common");
const middleware = require('../../../../middleware/validators');
const { t } = require('localizify');


// //APIs
// const multer = require('multer');


// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/images')
//     },
//     filename: function (req, file, cb) {
//         var image = `${Date.now()}-Social-Media-${file.originalname}`
//         req.body.media_name = image;
//         cb(null, image)
        
//     }
// });

// var upload = multer({
//     storage: storage
// });



// add to cart
router.post("/add-to-cart", function (req, res) {
    var request = req.body

    var rules = {
        book_id:'required',
        quantity: 'required'
    }

    var message = {
        required: t('required')
    }

    request.user_id = req.user_id
    if (middleware.checkValidationRules(res, request, rules, message)) {
        home_model.addTOCart(request, function (code, message, data) {
            common.response(req, res, code, message, data);
        })
    }

});


router.post("/listing-cart", function (req, res) {
    var request = req.body

    request.user_id = req.user_id
    home_model.listingCart(request, function (code, message, data) {
        common.response(req, res, code, message, data);
    })
    
});

router.post("/place-order", function (req, res) {
    var request = req.body

    request.user_id = req.user_id
    home_model.placeOrder(request, function (code, message, data) {
        common.response(req, res, code, message, data);
    })

});


router.post("/listing-orders", function (req, res) {
    var request = req.body

    request.user_id = req.user_id
    home_model.listingOrder(request, function (code, message, data) {
        common.response(req, res, code, message, data);
    })

});

router.post("/status-update", function (req, res) {
    var request = req.body

    var rules = {
        order_id:'required',
        status: 'required'
    }

    var message = {
        required: t('required')
    }

    request.user_id = req.user_id
    if (middleware.checkValidationRules(res, request, rules, message)) {
        home_model.statusUpdate(request, function (code, message, data) {
            common.response(req, res, code, message, data);
        })
    }

});




module.exports = router
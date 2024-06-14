var express = require('express');
var router = express.Router();
var home_model = require("./home_model");
var common = require("../../../../config/common");
const middleware = require('../../../../middleware/validators');
const { t } = require('localizify');


//APIs
const multer = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {

        var type = file.mimetype.split('/')
        if(type[0] === 'image'){
            cb(null, './public/images')
        }else{
            cb(null, './public/pdf')
        }
        
    },
    filename: function (req, file, cb) {
        var file_name = `${Date.now()}-book-${file.originalname}`
        var type = file.mimetype.split('/')
        if(type[0] === 'image'){
            req.body.thumbnail = file_name;
        }else{
            req.body.pdf = file_name;
        }
        
        cb(null, file_name)
        
    }
});

var upload = multer({
    storage: storage
});

// add new book
router.post("/add-book",upload.fields([{name:'thumbnail',maxCount:1},{name:'pdf',maxCount:1}]), function (req, res) {
    var request = req.body
    var rules = {
        title:"required",
        author:"required",
        thumbnail:"required",
        pdf:"required",
        no_of_page:"required",
        price:"required",
        tags:"required",
    }

    var message = {
        required: t('required')
    }

    
    request.user_id = req.user_id
    if (middleware.checkValidationRules(res, request, rules, message)) {
        home_model.addBook(request, function (code, message, data) {
            common.response(req, res, code, message, data);
        })
    }

});

//list books
router.post("/listing-books", function (req, res) {
    var request = req.body

    request.user_id = req.user_id

    home_model.listingBooks(request, function (code, message, data) {
        common.response(req, res, code, message, data);
    })

});

//delete book
router.post("/delete-book", function (req, res) {
    request = req.body

    var rules = {
        id:"required"
    }

    var message = {
        required: t('required')
    }

    if (middleware.checkValidationRules(res, request, rules, message)) {
        home_model.deleteBook(request, function (code, message, data) {
            common.response(req, res, code, message, data);
        })
    }

});


module.exports = router
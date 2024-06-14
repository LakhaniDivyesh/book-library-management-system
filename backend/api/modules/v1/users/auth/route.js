var express = require('express');
var router = express.Router();
var auth_model = require("./auth_model");
var common = require("../../../../config/common");
const middleware = require('../../../../middleware/validators');
const { t } = require('localizify');


//APIs

//Login
router.post("/login", function (req, res) {
    request = req.body

    var rules = {
        email: "required",
        password: "required"
    }

    var message = {
        required: t('required')
    }

    if (middleware.checkValidationRules(res, request, rules, message)) {
        auth_model.login(request, function (code, message, data) {
            common.response(req, res, code, message, data);
        })
    }

});


//signup
router.post("/signup", function (req, res) {
    request = req.body

    var rules = {
        name: 'required',
        username: 'required',
        email: 'required|email',
        country_code:"required",
        mobile : "required",
        password: "required",
    }

    var message = {
        required: t('required'),
        email: t('valid'),
    }

    if (middleware.checkValidationRules(res, request, rules, message)) {
        auth_model.signup(request, function (code, message, data) {
            common.response(req, res, code, message, data);
        })
    }

});

//cc
router.post("/listing-country-code", function (req, res) {
    request = req.body

    auth_model.ListingCC(request, function (code, message, data) {
        common.response(req, res, code, message, data);
    })

});


module.exports = router
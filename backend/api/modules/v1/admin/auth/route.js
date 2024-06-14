var express = require('express');
var router = express.Router();
var auth_model = require("./auth_model");
var common = require("../../../../config/common");
const middleware = require('../../../../middleware/validators');
const { t } = require('localizify');


//APIs

//Login
router.post("/admin-login", function (req, res) {
    request = req.body

    var rules = {
        email: "required",
        password: "required"
    }

    var message = {
        required: t('required')
    }

    if (middleware.checkValidationRules(res, request, rules, message)) {
        auth_model.adminLogin(request, function (code, message, data) {
            common.response(req, res, code, message, data);
        })
    }

});

router.post("/logout", function (req, res) {
    request = req.body

    request.user_id = req.user_id
    auth_model.logout(request, function (code, message, data) {
        common.response(req, res, code, message, data);
    })

});



module.exports = router
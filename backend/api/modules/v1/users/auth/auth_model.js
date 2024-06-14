var conn = require("../../../../config/database");
var common = require("../../../../config/common");
var constant = require("../../../../config/constant");
var md5 = require('md5');
var asyncLoop = require('node-async-loop');

var auth_model = {

    //Login
    login: function (request, callback) {

        var login = `select * from tbl_users where email = ? and password = ? and role = 'user' and is_active = 1 and is_deleted = 0;`
        var condition = [request.email, md5(request.password)]

        conn.query(login, condition, function (error, result) {
            if (error) {
                callback('0', { keyword: 'sql_error', content: { error: "login" } }, error);
            } else {

                if (result.length > 0) {
                    var token = common.generateToken()
                    var update_token = `update tbl_users set token = '${token}' where id = ${result[0].id}`

                    conn.query(update_token, function (error, updateToken) {
                        if (!error && updateToken.affectedRows > 0) {
                            var data = {
                                name: result[0].name,
                                email: result[0].email,
                                role: result[0].role,
                                token: token
                            }
                            callback('1', { keyword: 'successfully_login', content: {} }, [data]);
                        } else {
                            callback('0', { keyword: 'sql_error', content: { error: "login" } }, error);
                        }
                    })

                } else {
                    callback('0', { keyword: 'Invalid_credential', content: {} }, result);
                }

            }
        })

    },

    //Signup
    signup: function (request, callback) {
        var queryData = {
            name: request.name,
            username: request.username,
            email: request.email,
            country_code: request.country_code,
            mobile: request.mobile,
            password: md5(request.password),
            role: 'user',
            token: common.generateToken()
        }

        common.checkEmail(request.email, function (response) {

            if (response) {
                callback('0', { keyword: 'email_exist', content: {} }, []);
            } else {

                common.checkUsername(request.username, function (response) {

                    if (response) {
                        callback('0', { keyword: 'username_exist', content: {} }, []);
                    } else {
                        var signup = `INSERT INTO tbl_users SET ?;`

                        conn.query(signup, queryData, function (error, userData) {
                            if (error) {
                                callback('0', { keyword: 'sql_error', content: { error: "signup" } }, error);
                            } else {

                                var user = `Select name,email,token,role from tbl_users where id = ${userData.insertId} and is_active = 1 and is_deleted = 0;`

                                conn.query(user, function (error, result) {
                                    if (!error && result.length > 0) {
                                        callback('1', { keyword: 'success_signup', content: {} }, result);
                                    } else {
                                        callback('0', { keyword: 'sql_error', content: { error: "get user data" } }, error);
                                    }
                                })
                            }
                        })
                    }
                })
            }
        });
    },

    ListingCC: function (request, callback) {
        var cc = `Select id,code from tbl_country_code where is_active = 1 and is_deleted = 0;`

        conn.query(cc, function (error, result) {
            if (!error && result.length > 0) {
                callback('1', { keyword: 'data_found', content: {} }, result);
            } else {
                callback('0', { keyword: 'data_not_found', content: { error: "get user data" } }, error);
            }
        })
    }


}

module.exports = auth_model
var conn = require("../../../../config/database");
var common = require("../../../../config/common");
// var constant = require("../../../../config/constant");
var md5 = require('md5');
var asyncLoop = require('node-async-loop');

var auth_model = {

    //Login
    adminLogin: function (request, callback) {

        var login = `select * from tbl_users where email = ? and password = ? and  role = 'admin' and is_active = 1 and is_deleted = 0;`
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
                                email : result[0].email,
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


    // Logout
  logout: function (request, callback) {
    const logoutUser = `UPDATE tbl_users SET token = null WHERE id = '${request.user_id}';`;

    conn?.query(logoutUser, function (error, logout) {
      if (!error && logout?.affectedRows > 0) {
        callback("1", { keyword: "logout_success", content: "" }, []);
      } else {
        callback("0", { keyword: "error", content: { error: "logout" } }, []);
      }
    });
  },

}

module.exports = auth_model
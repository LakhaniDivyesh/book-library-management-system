var conn = require("../../../../config/database");
var common = require("../../../../config/common");
var constant = require("../../../../config/constant");
// var md5 = require('md5');
var asyncLoop = require('node-async-loop');
const { query } = require("express");


var home_model = {


    addTOCart: function (request, callback) {
        var user_id = request.user_id
        var book_id = request.book_id
        var quantity = request.quantity

        common.checkCart(user_id, book_id, function (response) {

            if (response) {

                if (quantity !== 0) {

                    var cart_update = `UPDATE tbl_cart set quantity = ${quantity} where user_id = ${user_id} and book_id = ${book_id} and is_active = 1 and is_deleted = 0`

                    conn.query(cart_update, queryData, function (error, result) {
                        if (!error && result.affectedRows > 0) {
                            callback('1', { keyword: 'success_cart', content: {} }, []);
                        } else {
                            console.log(error);
                            callback('0', { keyword: 'sql_error', content: { error: "cart quantity update" } }, []);
                        }
                    })

                } else {
                    var cart_update = `DELETE from tbl_cart where user_id = ${user_id} and book_id = ${book_id}`

                    conn.query(cart_update, queryData, function (error, result) {
                        if (!error && result.affectedRows > 0) {
                            callback('1', { keyword: 'success_cart', content: {} }, []);
                        } else {
                            console.log(error);
                            callback('0', { keyword: 'sql_error', content: { error: "cart quantity delete" } }, []);
                        }
                    })
                }

            } else {

                var queryData = {
                    user_id: user_id,
                    book_id: book_id,
                    quantity: quantity
                }

                var cart = `INSERT INTO tbl_cart SET ?;`

                conn.query(cart, queryData, function (error, cartData) {
                    if (!error) {
                        callback('1', { keyword: 'success_cart', content: {} }, []);
                    } else {
                        console.log(error);
                        callback('0', { keyword: 'sql_error', content: { error: "cart" } }, []);
                    }
                })

            }

        })

    },

    listingCart: function (request, callback) {


        if (request.book_id !== undefined && request.book_id !== null) {
            var book = `and c.book_id = ${request.book_id}`
        } else {
            var book = ``
        }

        var cart = `select c.*,b.*,CONCAT('${constant.IMAGE}',b.thumbnail) as thumbnail,CONCAT('${constant.PDF}',b.pdf) as pdf from tbl_cart  c join tbl_book b on c.book_id = b.id where c.user_id = ${request.user_id} ${book} and c.is_active = 1 and c.is_deleted = 0;`

        conn.query(cart, function (error, result) {
            if (!error) {
                callback('1', { keyword: 'success_cart', content: {} }, result);
            } else {
                callback('0', { keyword: 'sql_error', content: { error: "listing cart" } }, []);
            }
        })


    },

    placeOrder: function (request, callback) {
        var cart = `select c.*,b.*from tbl_cart  c join tbl_book b on c.book_id = b.id where c.user_id = ${request.user_id} and c.is_active = 1 and c.is_deleted = 0;`

        conn.query(cart, function (error, result) {
            if (!error && result.length > 0) {

                var sub_total = (result.reduce((a, v) => a = a + (v.quantity * v.price), 0))
                var charge = 50
                var queryData = {
                    user_id: request.user_id,
                    order_number: `ORDERBOOK${common.generateToken()}`,
                    total_quantity: (result.reduce((a, v) => a = a + v.quantity, 0)),
                    sub_total: sub_total,
                    charge: charge,
                    grand_total: sub_total + charge,
                    status: 'pending'
                }

                var order = `INSERT INTO tbl_order SET ?;`

                conn.query(order, queryData, function (error, orderData) {
                    if (!error) {

                        asyncLoop(result, (item, next) => {

                            var queryData = {
                                order_id: orderData.insertId,
                                book_id: item.book_id,
                                qnt: item.quantity,
                                price: item.price,
                                total: item.quantity * item.price
                            }
                            var insertQuery = `insert into tbl_order_details set ?`
                            conn.query(insertQuery, [queryData], function (nestedError, nestedResult) {
                                next();
                            })


                        }, (error) => {
                            if (error) {
                                callback('0', { keyword: 'sql_error', content: { error: "nested data" } }, []);
                            } else {

                                var cart_update = `DELETE from tbl_cart where user_id = ${request.user_id}`

                                conn.query(cart_update, function (error, result) {
                                    if (!error && result.affectedRows > 0) {
                                        callback('1', { keyword: 'order_placed', content: {} }, {});
                                    } else {
                                        console.log(error);
                                        callback('0', { keyword: 'sql_error', content: { error: "cart  delete" } }, []);
                                    }
                                })

                            }
                        })

                    } else {
                        console.log(error);
                        callback('0', { keyword: 'sql_error', content: { error: "place order" } }, []);
                    }
                })

            } else {
                callback('0', { keyword: 'sql_error', content: { error: "listing cart" } }, []);
            }
        })
    },

    listingOrder: function (request, callback) {

        if (request.user) {
            var q = `user_id = ${request.user_id} and`
        } else {
            var q = ``
        }

        var order = `SELECT o.*,o.id as order_id,o.created_at as order_date, u.* from tbl_order o join tbl_users u on o.user_id = u.id where ${q} o.is_active = 1 and o.is_deleted = 0 order by o.created_at desc`

        conn.query(order, function (error, result) {
            if (error) {

                callback('0', { keyword: 'sql_error', content: { error: "listing order" } }, []);

            } else if (result.length > 0) {

                asyncLoop(result, (item, next) => {

                    var selectQuery = `select od.*,od.price as order_price, b.*,CONCAT('${constant.IMAGE}',b.thumbnail) as thumbnail,CONCAT('${constant.PDF}',b.pdf) as pdf from tbl_order_details od join tbl_book b on od.book_id = b.id where od.order_id = ${item.order_id}`
                    conn.query(selectQuery, function (nestedError, nestedResult) {
                        item.books = nestedResult
                        next();
                    })


                }, (error) => {
                    if (error) {
                        callback('0', { keyword: 'sql_error', content: { error: "nested data" } }, []);
                    } else {

                        callback('1', { keyword: 'data_found', content: {} }, result);

                    }
                })

            } else {
                callback('1', { keyword: 'data_not_found', content: {} }, result);
            }
        })
    },
    statusUpdate: function (request, callback) {
        var status_update = `UPDATE tbl_order set status = '${request.status}' where id = ${request.order_id} and is_active = 1 and is_deleted = 0`

        conn.query(status_update, function (error, result) {
            if (!error && result.affectedRows > 0) {
                callback('1', { keyword: 'success_update_status', content: {} }, []);
            } else {
                console.log(error);
                callback('0', { keyword: 'sql_error', content: { error: "order status update" } }, []);
            }
        })
    }

}

module.exports = home_model
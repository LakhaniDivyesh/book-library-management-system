var conn = require("../../../../config/database");
var common = require("../../../../config/common");
var constant = require("../../../../config/constant");
// var md5 = require('md5');
var asyncLoop = require('node-async-loop');


var home_model = {

    //add new book
    addBook: function (request, callback) {


        var queryData = {
            // user_id: request.user_id,
            title: request.title,
            author: request.author,
            thumbnail: request.thumbnail,
            pdf: request.pdf,
            no_of_page: request.no_of_page,
            price: request.price,
            tags: request.tags,
        }

        var signup = `INSERT INTO tbl_book SET ?;`

        conn.query(signup, queryData, function (error, postData) {
            if (!error && postData.affectedRows > 0) {
                callback('1', { keyword: 'success_book', content: {} }, []);
            } else {
                console.log(error);
                callback('0', { keyword: 'sql_error', content: { error: "book" } }, error);
            }
        })
    },

    listingBooks: function (request, callback) {

        var search = request.search || '';
        if (search !== '') {
            var searchQuery = `(title LIKE '%${search}%' or author LIKE '%${search}%' or tags LIKE '%${search}%') and`
        } else {
            var searchQuery = ``
        }


        if(request.page == undefined || request.page == null || request.pageLimit == undefined || request.pageLimit == null){
            var pageQuery = ``
        }else{
            var pageQuery = `LIMIT ${request.pageLimit} OFFSET ${request.page * request.pageLimit}`
        }
        

        var book = `Select *,CONCAT('${constant.IMAGE}',thumbnail) as thumbnail,CONCAT('${constant.PDF}',pdf) as pdf from tbl_book where ${searchQuery} is_active = 1 and is_deleted = 0 ${pageQuery};
        select count(id) as total_page from tbl_book where ${searchQuery} is_active = 1 and is_deleted = 0`

        conn.query(book, function (error, result) {
            if(error){
                console.log(error);
                callback('0', { keyword: 'sql_error', content: { error: "listing book" } }, []);
            }else if (result.length > 0) {
                callback('1', { keyword: 'data_found', content: {} }, result);
            } else {
                callback('1', { keyword: 'data_not_found', content: {} }, result);
            }
        })
    },

    deleteBook: function (request, callback) {

        var delete_user = `update tbl_book set is_deleted = 1 where id = ${request.id}`

        conn.query(delete_user, function (error, result) {
            if (!error && result.affectedRows > 0) {
                callback('1', { keyword: 'successfully_delete', content: {} }, []);
            } else {
                console.log(error);
                callback('0', { keyword: 'sql_error', content: { error: "login" } }, []);
            }
        })
    }


}

module.exports = home_model
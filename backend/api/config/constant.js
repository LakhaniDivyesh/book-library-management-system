var url = 'http://localhost:'+process.env.PORT + '/public'

var globals = {
    IMAGE : url + "/images/",
    PDF : url + "/pdf/",
    // BASE_URL: 'http://localhost/23-exam/api/',
    // PORT_BASE_URL : `http://localhost:${process.env.PORT}/api/v1/`,
    // APP_NAME : "21-employee"
}

module.exports = globals;
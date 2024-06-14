require('dotenv').config();

var express = require('express');
var cors = require('cors');
let app = express();

// app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors())

app.use('/public/images', express.static(__dirname + '/public/images'));
app.use('/public/pdf', express.static(__dirname + '/public/pdf'));

app.use('/', require('./middleware/validators').extractHeaderLanguage);
app.use('/', require('./middleware/validators').validateApiKey);
app.use('/', require('./middleware/validators').validateHeaderToken);
// app.use('/', require('./middleware/validators').decryption);


//admin
var admin_auth = require("./modules/v1/admin/auth/route");
app.use('/api/v1/admin/auth', admin_auth);

var admin_home = require("./modules/v1/admin/home/route");
app.use('/api/v1/admin/home', admin_home);

//user
var user_auth = require("./modules/v1/users/auth/route");
app.use('/api/v1/user/auth', user_auth);

var user_home = require("./modules/v1/users/home/route");
app.use('/api/v1/user/home', user_home);


try {
    app.listen(process.env.PORT)
    console.log("Server⚡: " + process.env.PORT);
} catch (error) {
    console.log("failed" + error);
}
var express = require("express");
var bodyparser = require("body-parser");
var upload = require("express-fileupload");
var session = require("express-session");


var user_route = require("./Routes/user_route");
var admin_route = require("./Routes/admin_route");
var app = express();
app.use(express.static("public/"))
app.use(bodyparser.urlencoded({ extended: true }));
app.use(upload());
app.use(session(
    {
        secret: "a2z edehjdejy",
        saveUninitialized: true,
        resave: true
    }
));
app.use("/", user_route);
app.use("/admin", admin_route);

app.listen(3306);

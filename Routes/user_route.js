var express = require("express");
var router = express.Router();
var exe = require("./../connection");

router.get("/", async function (req, res) {
    var home_data = await exe("SELECT * FROM home_info")
    var photo = await exe("SELECT * FROM logo")

    var obj = {
        "home_data": home_data[0],
        "photo": photo

    }
    res.render("user/Home.ejs", obj);
});




router.get("/about", async function (req, res) {
    var about_detail = await exe(`SELECT * FROM about_info `)
    var photo = await exe("SELECT * FROM logo")

    var obj = {
        "about_detail": about_detail,
        "photo": photo

    }
    res.render("user/About.ejs", obj);
});

router.get("/academics", async function (req, res) {
    var photo = await exe("SELECT * FROM logo")
    var obj = { "photo": photo }

    res.render("user/Academics.ejs", obj);
});
router.get("/career", async function (req, res) {
    var photo = await exe("SELECT * FROM logo")
    var career_data = await exe("SELECT * FROM career_info");
    var obj = {
        "photo": photo,
        "career_data": career_data

    }
    res.render("user/Career.ejs", obj);
});
router.get("/faculty", async function (req, res) {
    var faculty_detail = await exe(`SELECT * FROM faculty_detail`)
    var photo = await exe("SELECT * FROM logo")
    var obj = { "faculty_detail": faculty_detail, "photo": photo }
    res.render("user/Faculty.ejs", obj);
});

router.get("/addmission", async function (req, res) {
    var photo = await exe("SELECT * FROM logo")
    var obj = { "photo": photo }
    res.render("user/Addmission.ejs", obj);
});
router.get("/contact", async function (req, res) {
    var photo = await exe("SELECT * FROM logo")
    var contact = await exe("SELECT * FROM contact")
    var obj = {
        "photo": photo
        , "contact": contact
    }
    res.render("user/Contact.ejs", obj);
});


module.exports = router;
var express = require("express");
var router = express.Router();
var exe = require("./../connection");


router.get("/", function (req, res) {
  res.render("admin/login.ejs");
});

router.post("/do_login", async function (req, res) {
  var d = req.body;
  var sql = `SELECT * FROM admin_info WHERE admin_email='${d.admin_email}' AND password='${d.password}'`;
  var data = await exe(sql);
  if (data.length > 0) {
    req.session.admin_id = data[0].admin_id;
    res.redirect("/admin/manage_logo")
  }
  else {
    res.send("<script>alert('Invalid Details'); history.back();</script>")
  }

})

router.get("/register_here", function (req, res) {
  res.render("admin/Register.ejs");
});

router.post("/do_register", async function (req, res) {
  var d = req.body;
  var sql = `INSERT INTO admin_info(admin_name,admin_email,password) VALUES('${d.admin_name}','${d.admin_email}','${d.password}')`;
  var data = await exe(sql);
  res.redirect("/admin/")

})

router.get("/manage_logo", async function (req, res) {
  var logo = await exe("SELECT * FROM logo");
  var obj = { "logo": logo }
  res.render("admin/manage_logo.ejs", obj);
})

router.post("/save_logo", async function (req, res) {

  var logo = new Date().getTime() + req.files.logo.name;
  req.files.logo.mv("public/images/" + logo)
  var sql = `UPDATE logo SET logo='${logo}' WHERE logo_id =1`;
  var data = await exe(sql)
  res.redirect("/admin/manage_logo")
})

router.get("/manage_home", async function (req, res) {
  console.log(req.session)
  var home_data = await exe("SELECT * FROM home_info");
  var obj = { "home_data": home_data }
  res.render("admin/manage_home.ejs", obj);
});

router.post("/save_home_details", async function (req, res) {

  if (req.files) {
    var founder_image = new Date().getTime() + req.files.founder_img.name;
    req.files.founder_img.mv("public/images/" + founder_image)
    var d = req.body;
    var sql = `UPDATE home_info SET founder_image='${founder_image}',founder_text = '${d.founder_msg}' WHERE home_id =1`;
    var data = await exe(sql)
  }
  else {
    var d = req.body;
    var sql = `UPDATE home_info SET founder_text = '${d.founder_msg}' WHERE home_id =1`;
    var data = await exe(sql)
  }
  res.redirect("/admin/manage_home")

})



router.get("/manage_about", async function (req, res) {
  var d = req.body
  var about_data = await exe(`SELECT * FROM about_info `);
  var obj = { "about_data": about_data }
  res.render("admin/manage_about.ejs", obj);
});

router.post("/save_about_detail", async function (req, res) {
  var d = req.body

  var testimonial_img = new Date().getTime() + req.files.testimonial_img.name;
  req.files.testimonial_img.mv("public/images/" + testimonial_img);

  var sql = `INSERT INTO about_info(testimonial_img,testimonial_name,testimonial_details)VALUES('${testimonial_img}','${d.testimonial_name}','${d.testimonial_details}') `;
  var data = await exe(sql);

  res.redirect("/admin/manage_about")
})


router.get("/edit_about/:id", async function (req, res) {
  var d = req.body
  var about_data = await exe(`SELECT * FROM about_info WHERE about_id = '${req.params.id}'  `);
  var obj = { "about_data": about_data }
  res.render("admin/edit_about.ejs", obj)
})


router.post("/update_about_detail", async function (req, res) {
  var d = req.body;

  if (req.files) {
    var testimonial_img = new Date().getTime() + req.files.testimonial_img.name;
    req.files.testimonial_img.mv("public/images/" + testimonial_img);

    sql = `UPDATE about_info SET testimonial_img='${testimonial_img}',testimonial_name='${d.testimonial_name}',testimonial_details='${d.testimonial_details}' WHERE about_id = '${d.about_id}'`;
    var data = await exe(sql);

  }

  else {
    var sql = `UPDATE about_info SET  testimonial_name='${d.testimonial_name}',testimonial_details='${d.testimonial_details}' WHERE about_id = '${d.about_id}'`;

    var data = await exe(sql);
  }



  res.redirect("/admin/manage_about");
});


router.get("/delete_about/:id", async function (req, res) {
  var sql = `DELETE FROM about_info WHERE about_id = '${req.params.id}'`;
  var data = await exe(sql);
  res.redirect("/admin/manage_about")
})

router.get("/manage_academics", function (req, res) {
  res.render("admin/manage_academics.ejs");
});

router.get("/manage_career", async function (req, res) {
  var career_data = await exe("SELECT * FROM career_info");
  var obj = { "career_data": career_data }
  res.render("admin/manage_career.ejs", obj);
});

router.post("/save_career_detail", async function (req, res) {
  if (req.files) {

    var pdf_1 = new Date().getTime() + req.files.pdf_1.name;
    req.files.pdf_1.mv("public/images/" + pdf_1)

    // var sql = `INSERT INTO career_info(pdf_1,pdf_2,pdf_3,pdf_4,pdf_5) VALUES('${pdf_1}','${pdf_2}','${pdf_3}','${pdf_4}','${pdf_5}')`;
    var sql = `UPDATE career_info SET pdf_1 ='${pdf_1}' WHERE career_id =6`;
    var data = await exe(sql);

  }

  else if (req.files) {
    var pdf_2 = new Date().getTime() + req.files.pdf_2.name;
    req.files.pdf_2.mv("public/images/" + pdf_2)

    var sql = `UPDATE career_info SET pdf_2 ='${pdf_2}' WHERE career_id =6`;
    var data = await exe(sql);

  }
  else if (req.files) {
    var pdf_3 = new Date().getTime() + req.files.pdf_3.name;
    req.files.pdf_3.mv("public/images/" + pdf_3)

    var sql = `UPDATE career_info SET pdf_3 ='${pdf_3}' WHERE career_id =6`;
    var data = await exe(sql);

  }
  else if (req.files) {
    var pdf_4 = new Date().getTime() + req.files.pdf_4.name;
    req.files.pdf_4.mv("public/images/" + pdf_4)

    var sql = `UPDATE career_info SET pdf_4 ='${pdf_4}' WHERE career_id =6`;
    var data = await exe(sql);

  }
  else {
    var pdf_5 = new Date().getTime() + req.files.pdf_5.name;
    req.files.pdf_5.mv("public/images/" + pdf_5)

    var sql = `UPDATE career_info SET pdf_ 5='${pdf_5}' WHERE career_id =6`;
    var data = await exe(sql);

  }

  res.redirect("/admin/manage_career")
})

router.get("/manage_addmission", function (req, res) {
  res.render("admin/manage_addmission.ejs");
});

router.get("/manage_contact", async function (req, res) {
  var contact = await exe("SELECT * FROM contact")
  var obj = {
    "contact": contact
  }
  res.render("admin/manage_contact.ejs", obj);
});

router.post("/save_contact_detail", async function (req, res) {
  var d = req.body;
  // var sql = `INSERT INTO contact (principle,vice_principle,registrar,librarian,chief_rector) VALUES('${d.principle}','${d.vice_principle}','${d.registrar}','${d.librarian}','${d.chief_rector}')`;
  var sql = `UPDATE contact SET principle='${d.principle}',vice_principle='${d.vice_principle}',registrar='${d.registrar}',librarian='${d.librarian}',chief_rector='${d.chief_rector}'`;
  var data = await exe(sql);
  // res.send(req.body)
  res.redirect("/admin/manage_contact");
})

router.get("/manage_faculty", async function (req, res) {
  var fac_list = await exe(`SELECT * FROM faculty_detail`);
  var obj = { "fac_list": fac_list }
  res.render("admin/manage_faculty.ejs", obj);
});

router.post("/save_faculty_detail", async function (req, res) {
  var d = req.body;

  var file_name = new Date().getTime() + req.files.faculty_photo.name;
  req.files.faculty_photo.mv("public/images/" + file_name);


  var sql = `INSERT INTO faculty_detail(faculty_name,faculty_Designation,faculty_photo) VALUES('${d.faculty_name}','${d.faculty_Designation}','${file_name}')`;
  var data = await exe(sql);
  // console.log(req.files);
  res.redirect("/admin/manage_faculty")

});
router.get("/edit_faculty/:id", async function (req, res) {


  var fac_info = await exe(`SELECT * FROM faculty_detail `);

  var obj = { "fac_info": fac_info };

  res.render("admin/edit_faculty.ejs", obj)

});


router.post("/update_faculty_detail", async function (req, res) {
  var d = req.body;

  if (req.files) {
    var file_name = new Date().getTime() + ".png";
    req.files.faculty_photo.mv("public/images/" + file_name);

    sql = `UPDATE faculty_detail SET faculty_photo='${file_name}' WHERE faculty_id = '${d.faculty_id}'`;
    var data = await exe(sql);

  }

  sql = `UPDATE faculty_detail SET faculty_name='${d.faculty_name}',faculty_Designation='${d.faculty_Designation}' WHERE faculty_id = '${d.faculty_id}'`;
  var data = await exe(sql);

  // res.send(data)
  res.redirect("/admin/manage_faculty");
});


router.get("/delete_faculty/:id", async function (req, res) {
  var sql = `DELETE FROM faculty_detail WHERE faculty_id = '${req.params.id}'`;
  var data = await exe(sql);
  res.redirect("/admin/manage_faculty")
})

router.get('/log_out', function (req, res) {
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/admin/")
      }
    });
  }
});
module.exports = router;
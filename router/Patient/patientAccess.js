const express = require("express");
const router = new express.Router();
const pool = require("../../db/database");

router.get("/patient-register", async (req, res) => {
  res.render("Patient/patientRegister");
});

router.post("/patient-register", async (req, res) => {
  try {
    const role = "Patient";
    const {first_name,last_name,email_address,phone_number,password,address_line1,address_line2,city,state,zipcode } = req.body;
    const newUser = await pool.query("INSERT INTO users(first_name,last_name,email_address,phone_number,password,address_line1,address_line2,city,state,zipcode,role) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *",[first_name,last_name,email_address,phone_number,password,address_line1,address_line2,city,state,zipcode,role])
    res.redirect("/patient-dashboard");
  } catch (e) {
      res.send(e);
  }
});

router.get("/patient-login", async (req, res) => {
  res.render("Patient/patientLogin");
});

router.post("/patient-login", async (req, res) => {
        const {email_address,password} = req.body;
        const role = "Patient";
  try{
    const user = await pool.query("SELECT * FROM users WHERE email_address = $1 AND password = $2 AND role = $3",[email_address,password,role])
    if(user.rowCount < 1){
      res.send({error:"No such error!"})
    }
    res.redirect("/patient-dashboard")
  }catch(e){
    res.send(e);
  }
});


router.get("/patient-dashboard",async(req,res)=>{
  res.render("Patient/patientDashboard");
})

module.exports = router;

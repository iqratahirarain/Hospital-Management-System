const express = require("express");
const router = new express.Router();
const pool = require("../../db/database");
const jwt = require("jsonwebtoken");
const patientAuth = require("../../middleware/patientAuth");
const {forgetPassword} = require("../../emails/emails");

router.get("/patient-register", async (req, res) => {
  res.render("Patient/patientRegister");
});

router.post("/patient-register", async (req, res) => {
  try {
    const role = "Patient";
    const NULL = '';
    const {first_name,last_name,email_address,phone_number,password,address_line1,address_line2,city,state,zipcode } = req.body;
    const newUser = await pool.query("INSERT INTO users(first_name,last_name,email_address,phone_number,password,address_line1,address_line2,city,state,zipcode,role,token) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *",[first_name,last_name,email_address,phone_number,password,address_line1,address_line2,city,state,zipcode,role,NULL])
    const user_id = newUser.rows[0].user_id;
    const token = jwt.sign({ _id: user_id.toString() }, "thisismysecret");
    const tokenedUser = await pool.query("UPDATE users SET TOKEN = $1 WHERE user_id = $2 RETURNING *",[token,user_id]);
    res.cookie('patient_token', token);
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
    const user = await pool.query("SELECT * FROM users WHERE email_address = $1 AND password = $2 AND role = $3 ",[email_address,password,role])
    if(user.rowCount != 1){
      res.send({error:"No such user!"})
    }
    // res.json(user)
    const user_id = user.rows[0].user_id;
    const token = jwt.sign({ _id: user_id.toString() }, "thisismysecret");
    const tokenedUser = await pool.query("UPDATE users SET TOKEN = $1 WHERE user_id = $2 RETURNING *",[token,user_id]);
    res.cookie('patient_token', token);
    res.redirect("/patient-dashboard")
  }catch(e){
    res.send(e);
  }
});

//Dashboard
router.get("/patient-dashboard",patientAuth,async(req,res)=>{
  const full_name = req.user.first_name + " " + req.user.last_name;
  const role = req.user.role;
  res.render("Patient/patientDashboard",{full_name:full_name,role:role});
})

//Book an appointment
router.get("/patient-dashboard-book-an-appointment",patientAuth,async(req,res)=>{
  const full_name = req.user.first_name + " " + req.user.last_name;
  const role = req.user.role;
  res.render("Patient/patientDashboard-book-an-appointment",{full_name:full_name,role:role});
})

router.post("/patient-dashboard-book-an-appointment",async(req,res)=>{
  const {email_address} = req.body;
  const user = await pool.query("SELECT * FROM users WHERE email_address = $1",[email_address]);
  bookanappointment(email_address,user.rows[0].user_id,user.rows[0].role);
  res.redirect("/patient-dashboard-book-an-appointment");
})

//Forgot Password
router.get("/patient-forgot-password",async(req,res)=>{
  res.render("Patient/forgotPassword");
})

router.post("/patient-forgot-password",async(req,res)=>{
  const {email_address} = req.body;
  const user = await pool.query("SELECT * FROM users WHERE email_address = $1",[email_address]);
  forgetPassword(email_address,user.rows[0].user_id,user.rows[0].role);
  res.redirect("/patient-forgot-password");
})

router.get("/patient-reset-password/:user_id",async(req,res)=>{
  res.render("Patient/resetPassword",{user_id:req.params.user_id});
})

router.post("/patient-reset-password/:user_id",async(req,res)=>{
  const user_id = req.params.user_id;
  const updatedUser = await pool.query("UPDATE users SET password = $1 WHERE user_id = $2",[req.body.password,user_id]);
  res.redirect("/patient-login");
})

//Logout
router.get("/patient-logout",patientAuth,async(req,res)=>{
    try{
      const user_id = req.user.user_id;
      const untokenedUser = await pool.query("UPDATE users SET token = $1 WHERE user_id = $2",['',user_id]);
      res.clearCookie("patient_token");
      res.redirect("/");
    }catch(e){
      res.send(e);
    }
})

module.exports = router;

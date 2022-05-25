const express = require("express");
const router = new express.Router();
const pool = require("../../db/database");
const jwt = require("jsonwebtoken");
const nurseAuth = require("../../middleware/nurseAuth");
const {forgetPassword} = require("../../emails/emails");

router.get("/nurse-login", async (req, res) => {
  res.render("Nurse/nurseLogin");
});

router.post("/nurse-login", async (req, res) => {
  const { email_address, password } = req.body;
  const role = "Nurse";
  try{
    const user = await pool.query("SELECT * FROM users WHERE email_address = $1 AND password = $2 AND role = $3 ",[email_address,password,role])
    if(user.rowCount != 1){
      res.send({error:"No such user!"})
    }
    // res.json(user)
    const user_id = user.rows[0].user_id;
    const token = jwt.sign({ _id: user_id.toString() }, "thisismysecret");
    const tokenedUser = await pool.query("UPDATE users SET TOKEN = $1 WHERE user_id = $2 RETURNING *",[token,user_id]);
    res.cookie('nurse_token', token);
    res.redirect("/nurse-dashboard")
  }catch(e){
    res.send(e);
  }
});

router.get("/nurse-dashboard",nurseAuth,async(req,res)=>{
  const full_name = req.user.first_name + " " + req.user.last_name;
  const role = req.user.role;
  res.render("Nurse/nurseDashboard",{full_name:full_name,role:role});
  })

//Forgot Password
router.get("/nurse-forgot-password",async(req,res)=>{
  res.render("Nurse/forgotPassword");
})

router.post("/nurse-forgot-password",async(req,res)=>{
  const {email_address} = req.body;
  const user = await pool.query("SELECT * FROM users WHERE email_address = $1",[email_address]);
  forgetPassword(email_address,user.rows[0].user_id,user.rows[0].role);
  res.redirect("/nurse-forgot-password");
})

router.get("/nurse-reset-password/:user_id",async(req,res)=>{
  res.render("Nurse/resetPassword",{user_id:req.params.user_id});
})

router.post("/nurse-reset-password/:user_id",async(req,res)=>{
  const user_id = req.params.user_id;
  const updatedUser = await pool.query("UPDATE users SET password = $1 WHERE user_id = $2",[req.body.password,user_id]);
  res.redirect("/nurse-login");
})


//Logout
router.get("/nurse-logout",nurseAuth,async(req,res)=>{
  try{
    const user_id = req.user.user_id;
    const untokenedUser = await pool.query("UPDATE users SET token = $1 WHERE user_id = $2",['',user_id]);
    res.clearCookie("nurse_token");
    res.redirect("/");
  }catch(e){
    res.send(e);
  }
})

module.exports = router;

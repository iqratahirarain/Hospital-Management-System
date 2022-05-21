const express = require("express");
const router = new express.Router();
const pool = require("../../db/database");
const jwt = require("jsonwebtoken");
const paAuth = require("../../middleware/paAuth");

router.get("/pa-login", async (req, res) => {
  res.render("PA/paLogin");
});

router.post("/pa-login", async (req, res) => {
  const { email_address, password } = req.body;
  const role = "PA";
  try{
    const user = await pool.query("SELECT * FROM users WHERE email_address = $1 AND password = $2 AND role = $3 ",[email_address,password,role])
    if(user.rowCount != 1){
      res.send({error:"No such user!"})
    }
    // res.json(user)
    const user_id = user.rows[0].user_id;
    const token = jwt.sign({ _id: user_id.toString() }, "thisismysecret");
    const tokenedUser = await pool.query("UPDATE users SET TOKEN = $1 WHERE user_id = $2 RETURNING *",[token,user_id]);
    res.cookie('pa_token', token);
    res.redirect("/pa-dashboard")
  }catch(e){
    res.send(e);
  }
});

router.get("/pa-dashboard",paAuth,async(req,res)=>{
  const full_name = req.user.first_name + " " + req.user.last_name;
  const role = req.user.role;
  res.render("PA/paDashboard",{full_name:full_name,role:role});
  })

//Logout
router.get("/pa-logout",paAuth,async(req,res)=>{
  try{
    const user_id = req.user.user_id;
    const untokenedUser = await pool.query("UPDATE users SET token = $1 WHERE user_id = $2",['',user_id]);
    res.clearCookie("pa_token");
    res.redirect("/");
  }catch(e){
    res.send(e);
  }
})

module.exports = router;

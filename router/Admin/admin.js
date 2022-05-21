const express = require("express");
const router = new express.Router();
const jwt = require('jsonwebtoken');
const adminAuth = require("../../middleware/adminAuth");
const pool = require("../../db/database");

router.get("/admin-login", async (req, res) => {
  res.render("Admin/adminLogin");
});

router.post("/admin-login", async (req, res) => {
    const {email_address,password} = req.body;
    const role = "Admin";
try{
const user = await pool.query("SELECT * FROM users WHERE email_address = $1 AND password = $2 AND role = $3 ",[email_address,password,role])
if(user.rowCount != 1){
  res.send({error:"No such user!"})
}
// res.json(user)
const user_id = user.rows[0].user_id;
const token = jwt.sign({ _id: user_id.toString() }, "thisismysecret");
const tokenedUser = await pool.query("UPDATE users SET TOKEN = $1 WHERE user_id = $2 RETURNING *",[token,user_id]);
res.cookie('admin_token', token);
res.redirect("/admin-dashboard")
}catch(e){
res.send(e);
}
});

router.get("/admin-dashboard",adminAuth,async (req, res) => {
    const full_name = req.user.first_name + " " + req.user.last_name;
    const role = req.user.role;
    res.render("Admin/adminDashboard",{full_name:full_name,role:role});
});

//Logout
router.get("/admin-logout",adminAuth,async(req,res)=>{
  try{
    const user_id = req.user.user_id;
    const untokenedUser = await pool.query("UPDATE users SET token = $1 WHERE user_id = $2",['',user_id]);
    res.clearCookie("admin_token");
    res.redirect("/");
  }catch(e){
    res.send(e);
  }
})

module.exports = router;

const express = require("express");
const router = new express.Router();
const pool = require("../../db/database")
const adminAuth = require("../../middleware/adminAuth");

//Physician 

//Register
router.get("/physician-register",adminAuth,async(req,res)=>{
    const full_name = req.user.first_name + " " + req.user.last_name;
    const role = req.user.role;
    res.render("Admin/Physician/physicianRegister",{full_name:full_name,role:role});
})

router.post("/physician-register",async(req,res)=>{   
    const role = "Physician";
    const NULL = '';
    const {first_name,last_name,email_address,phone_number,password,address_line1,address_line2,city,state,zipcode } = req.body;
    const newUser = await pool.query("INSERT INTO users(first_name,last_name,email_address,phone_number,password,address_line1,address_line2,city,state,zipcode,role,token) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *",[first_name,last_name,email_address,phone_number,password,address_line1,address_line2,city,state,zipcode,role,NULL])
    res.redirect("/physician-register");
})

//Delete

router.get("/physician-unregister",adminAuth,async(req,res)=>{
    const full_name = req.user.first_name + " " + req.user.last_name;
    const role = req.user.role;
    res.render("Admin/Physician/physicianUnregister",{full_name:full_name,role:role});
})

router.post("/physician-unregister",async(req,res)=>{
    const {email_address} = req.body;
    const deletedUser = await pool.query("DELETE FROM users WHERE email_address = $1",[email_address]);
    res.redirect("/physician-unregister");
})

/*Enddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd*/

//Front Desk 

//Register
router.get("/frontdesk-register",adminAuth,async(req,res)=>{
    const full_name = req.user.first_name + " " + req.user.last_name;
    const role = req.user.role;
    res.render("Admin/Front Desk/frontDeskRegister",{full_name:full_name,role:role});
})

router.post("/frontdesk-register",async(req,res)=>{   
    const role = "Front Desk";
    const NULL = '';
    const {first_name,last_name,email_address,phone_number,password,address_line1,address_line2,city,state,zipcode } = req.body;
    const newUser = await pool.query("INSERT INTO users(first_name,last_name,email_address,phone_number,password,address_line1,address_line2,city,state,zipcode,role,token) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *",[first_name,last_name,email_address,phone_number,password,address_line1,address_line2,city,state,zipcode,role,NULL])
    res.redirect("/frontdesk-register");
})

//Delete

router.get("/frontdesk-unregister",adminAuth,async(req,res)=>{
    const full_name = req.user.first_name + " " + req.user.last_name;
    const role = req.user.role;
    res.render("Admin/Front Desk/frontDeskUnregister",{full_name:full_name,role:role});
})

router.post("/frontdesk-unregister",async(req,res)=>{
    const {email_address} = req.body;
    const deletedUser = await pool.query("DELETE FROM users WHERE email_address = $1",[email_address]);
    res.redirect("/frontdesk-unregister");
})

/*Enddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd*/

//Nurse 

//Register
router.get("/nurse-register",adminAuth,async(req,res)=>{
    const full_name = req.user.first_name + " " + req.user.last_name;
    const role = req.user.role;
    res.render("Admin/Nurse/nurseRegister",{full_name:full_name,role:role});
})

router.post("/nurse-register",async(req,res)=>{   
    const role = "Nurse";
    const NULL = '';
    const {first_name,last_name,email_address,phone_number,password,address_line1,address_line2,city,state,zipcode } = req.body;
    const newUser = await pool.query("INSERT INTO users(first_name,last_name,email_address,phone_number,password,address_line1,address_line2,city,state,zipcode,role,token) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *",[first_name,last_name,email_address,phone_number,password,address_line1,address_line2,city,state,zipcode,role,NULL])
    res.redirect("/nurse-register");
})
//Delete

router.get("/nurse-unregister",adminAuth,async(req,res)=>{
    const full_name = req.user.first_name + " " + req.user.last_name;
    const role = req.user.role;
    res.render("Admin/Nurse/nurseUnregister",{full_name:full_name,role:role});
})

router.post("/nurse-unregister",async(req,res)=>{
    const {email_address} = req.body;
    const deletedUser = await pool.query("DELETE FROM users WHERE email_address = $1",[email_address]);
    res.redirect("/nurse-unregister");
})

/*Enddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd*/

//PA Register

router.get("/pa-register",adminAuth,async(req,res)=>{
    const full_name = req.user.first_name + " " + req.user.last_name;
    const role = req.user.role;
    res.render("Admin/PA/paRegister",{full_name:full_name,role:role});
})

router.post("/pa-register",async(req,res)=>{ 
    const role = "PA";  
    const NULL = '';
    const {first_name,last_name,email_address,phone_number,password,address_line1,address_line2,city,state,zipcode } = req.body;
    const newUser = await pool.query("INSERT INTO users(first_name,last_name,email_address,phone_number,password,address_line1,address_line2,city,state,zipcode,role,token) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *",[first_name,last_name,email_address,phone_number,password,address_line1,address_line2,city,state,zipcode,role,NULL])
    res.redirect("/pa-register");
})

//Delete
router.get("/pa-unregister",adminAuth,async(req,res)=>{
    const full_name = req.user.first_name + " " + req.user.last_name;
    const role = req.user.role;
    res.render("Admin/PA/paUnregister",{full_name:full_name,role:role});
})

router.post("/pa-unregister",async(req,res)=>{
    const {email_address} = req.body;
    const deletedUser = await pool.query("DELETE FROM users WHERE email_address = $1",[email_address]);
    res.redirect("/pa-unregister");
})

module.exports = router;
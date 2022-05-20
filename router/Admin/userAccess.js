const express = require("express");
const router = new express.Router();
const pool = require("../../db/database")


//Physician 

//Register
router.get("/physician-register",async(req,res)=>{
    res.render("Admin/Physician/physicianRegister");
})

router.post("/physician-register",async(req,res)=>{   
    const role = "Physician";
    const {first_name,last_name,email_address,phone_number,password,address_line1,address_line2,city,state,zipcode } = req.body;
    const newUser = await pool.query("INSERT INTO users(first_name,last_name,email_address,phone_number,password,address_line1,address_line2,city,state,zipcode,role) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *",[first_name,last_name,email_address,phone_number,password,address_line1,address_line2,city,state,zipcode,role])
    res.redirect("/physician-register");
})

//Delete

router.get("/physician-unregister",async(req,res)=>{
    res.render("Admin/Physician/physicianUnregister");
})

router.post("/physician-unregister",async(req,res)=>{
    const {email_address} = req.body;
    const deletedUser = await pool.query("DELETE FROM users WHERE email_address = $1",[email_address]);
    res.redirect("/physician-unregister");
})

/*Enddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd*/

//Front Desk 

//Register
router.get("/frontdesk-register",async(req,res)=>{
    res.render("Admin/Front Desk/frontDeskRegister");
})

router.post("/frontdesk-register",async(req,res)=>{   
    const role = "Front Desk";
    const {first_name,last_name,email_address,phone_number,password,address_line1,address_line2,city,state,zipcode } = req.body;
    const newUser = await pool.query("INSERT INTO users(first_name,last_name,email_address,phone_number,password,address_line1,address_line2,city,state,zipcode,role) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *",[first_name,last_name,email_address,phone_number,password,address_line1,address_line2,city,state,zipcode,role])
    res.redirect("/frontdesk-register");
})

//Delete

router.get("/frontdesk-unregister",async(req,res)=>{
    res.render("Admin/Front Desk/frontDeskUnregister");
})

router.post("/frontdesk-unregister",async(req,res)=>{
    const {email_address} = req.body;
    const deletedUser = await pool.query("DELETE FROM users WHERE email_address = $1",[email_address]);
    res.redirect("/frontdesk-unregister");
})

/*Enddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd*/

//Nurse 

//Register
router.get("/nurse-register",async(req,res)=>{
    res.render("Admin/Nurse/nurseRegister");
})

router.post("/nurse-register",async(req,res)=>{   
    const role = "Nurse";
    const {first_name,last_name,email_address,phone_number,password,address_line1,address_line2,city,state,zipcode } = req.body;
    const newUser = await pool.query("INSERT INTO users(first_name,last_name,email_address,phone_number,password,address_line1,address_line2,city,state,zipcode,role) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *",[first_name,last_name,email_address,phone_number,password,address_line1,address_line2,city,state,zipcode,role])
    res.redirect("/nurse-register");
})
//Delete

router.get("/nurse-unregister",async(req,res)=>{
    res.render("Admin/Nurse/nurseUnregister");
})

router.post("/nurse-unregister",async(req,res)=>{
    const {email_address} = req.body;
    const deletedUser = await pool.query("DELETE FROM users WHERE email_address = $1",[email_address]);
    res.redirect("/nurse-unregister");
})

/*Enddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd*/

//PA Register

router.get("/pa-register",async(req,res)=>{
    res.render("Admin/PA/paRegister");
})

router.post("/pa-register",async(req,res)=>{ 
    const role = "PA";  
    const {first_name,last_name,email_address,phone_number,password,address_line1,address_line2,city,state,zipcode } = req.body;
    const newUser = await pool.query("INSERT INTO users(first_name,last_name,email_address,phone_number,password,address_line1,address_line2,city,state,zipcode,role) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *",[first_name,last_name,email_address,phone_number,password,address_line1,address_line2,city,state,zipcode,role])
    res.redirect("/pa-register");
})

//Delete
router.get("/pa-unregister",async(req,res)=>{
    res.render("Admin/PA/paUnregister");
})

router.post("/pa-unregister",async(req,res)=>{
    const {email_address} = req.body;
    const deletedUser = await pool.query("DELETE FROM users WHERE email_address = $1",[email_address]);
    res.redirect("/pa-unregister");
})

module.exports = router;
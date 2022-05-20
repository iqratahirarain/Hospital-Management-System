const express = require("express");
const router = new express.Router();

router.get("/admin-dashboard",async(req,res)=>{
    res.render("Admin/adminDashboard");
})

module.exports = router;
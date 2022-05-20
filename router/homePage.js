const express = require("express");
const router = new express.Router();

router.get("/",async(req,res)=>{
    res.render("homePage");
})

module.exports = router;
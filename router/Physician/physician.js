const express = require("express");
const router = new express.Router();
const pool = require("../../db/database");

router.get("/physician-login", async (req, res) => {
  res.render("Physician/physicianLogin");
});

router.post("/physician-login", async (req, res) => {
  const { email_address, password } = req.body;
  const role = "Physician";
  try {
    const user = await pool.query(
      "SELECT * FROM users WHERE email_address = $1 AND password = $2 AND role = $3",
      [email_address, password,role]
    );
    if (user.rowCount < 1) {
      res.send({ error: "No such user!" });
    }
    res.redirect("/physician-dashboard");
  } catch (e) {
    res.send(e);
  }
});

router.get("/physician-dashboard",async(req,res)=>{
    res.render("Physician/physicianDashboard");
  })
  

module.exports = router;

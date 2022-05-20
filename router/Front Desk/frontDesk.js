const express = require("express");
const router = new express.Router();
const pool = require("../../db/database");

router.get("/frontdesk-login", async (req, res) => {
  res.render("Front Desk/frontDeskLogin");
});

router.post("/frontdesk-login", async (req, res) => {
  const { email_address, password } = req.body;
  const role = "Front Desk";
  try {
    const user = await pool.query(
      "SELECT * FROM users WHERE email_address = $1 AND password = $2 AND role = $3",
      [email_address, password,role]
    );
    if (user.rowCount < 1) {
      res.send({ error: "No such user!" });
    }
    res.redirect("/frontdesk-dashboard");
  } catch (e) {
    res.send(e);
  }
});

router.get("/frontdesk-dashboard",async(req,res)=>{
    res.render("Front Desk/frontDeskDashboard");
  })
  

module.exports = router;

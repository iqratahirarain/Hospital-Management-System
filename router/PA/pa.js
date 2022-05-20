const express = require("express");
const router = new express.Router();
const pool = require("../../db/database");

router.get("/pa-login", async (req, res) => {
  res.render("PA/paLogin");
});

router.post("/pa-login", async (req, res) => {
  const { email_address, password } = req.body;
  const role = "PA";
  try {
    const user = await pool.query(
      "SELECT * FROM users WHERE email_address = $1 AND password = $2 AND role = $3",
      [email_address, password,role]
    );
    if (user.rowCount < 1) {
      res.send({ error: "No such user!" });
    }
    res.redirect("/pa-dashboard");
  } catch (e) {
    res.send(e);
  }
});

router.get("/pa-dashboard",async(req,res)=>{
    res.render("PA/paDashboard");
  })
  

module.exports = router;

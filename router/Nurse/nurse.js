const express = require("express");
const router = new express.Router();
const pool = require("../../db/database");

router.get("/nurse-login", async (req, res) => {
  res.render("Nurse/nurseLogin");
});

router.post("/nurse-login", async (req, res) => {
  const { email_address, password } = req.body;
  const role = "Nurse";
  try {
    const user = await pool.query(
      "SELECT * FROM users WHERE email_address = $1 AND password = $2 AND role = $3",
      [email_address, password,role]
    );
    if (user.rowCount < 1) {
      res.send({ error: "No such user!" });
    }
    res.redirect("/nurse-dashboard");
  } catch (e) {
    res.send(e);
  }
});

router.get("/nurse-dashboard",async(req,res)=>{
    res.render("Nurse/nurseDashboard");
  })
  

module.exports = router;

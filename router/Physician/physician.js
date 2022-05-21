const express = require("express");
const router = new express.Router();
const pool = require("../../db/database");
const jwt = require("jsonwebtoken");
const physicianAuth = require("../../middleware/physicianAuth");

router.get("/physician-login", async (req, res) => {
  res.render("Physician/physicianLogin");
});

router.post("/physician-login", async (req, res) => {
  const { email_address, password } = req.body;
  const role = "Physician";
  try {
    const user = await pool.query(
      "SELECT * FROM users WHERE email_address = $1 AND password = $2 AND role = $3 ",
      [email_address, password, role]
    );
    if (user.rowCount != 1) {
      res.send({ error: "No such user!" });
    }
    // res.json(user)
    const user_id = user.rows[0].user_id;
    const token = jwt.sign({ _id: user_id.toString() }, "thisismysecret");
    const tokenedUser = await pool.query(
      "UPDATE users SET TOKEN = $1 WHERE user_id = $2 RETURNING *",
      [token, user_id]
    );
    res.cookie("physician_token", token);
    res.redirect("/physician-dashboard");
  } catch (e) {
    res.send(e);
  }
});

router.get("/physician-dashboard", physicianAuth, async (req, res) => {
  const full_name = req.user.first_name + " " + req.user.last_name;
  const role = req.user.role;
  res.render("Physician/physicianDashboard", {
    full_name: full_name,
    role: role,
  });
});

//Logout
router.get("/physician-logout", physicianAuth, async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const untokenedUser = await pool.query(
      "UPDATE users SET token = $1 WHERE user_id = $2",
      ["", user_id]
    );
    res.clearCookie("physician_token");
    res.redirect("/");
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;

const express = require("express");
const app = express();
var cookieParser = require('cookie-parser')

// Using express utilities
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine','ejs');
app.use(express.static(`${__dirname}/public`));

//Home Page Router
const homePageRouter = require("./router/homePage");
app.use(homePageRouter);

//Patient Routers
const patientAccessRouter = require("./router/Patient/patientAccess");
app.use(patientAccessRouter);

//Admin Routers
const adminRouters = require("./router/Admin/admin");
app.use(adminRouters);

//Front Desk
const frontDeskRouter = require("./router/Front Desk/frontDesk");
app.use(frontDeskRouter);

//Nurse
const nurseRouter = require("./router/Nurse/nurse");
app.use(nurseRouter);

//PA
const paRouter = require("./router/PA/pa");
app.use(paRouter);

//Physician
const physicianRouter = require("./router/Physician/physician");
app.use(physicianRouter);


//User Access
const userAccess = require("./router/Admin/userAccess");
app.use(userAccess)

//Setting up the server to listen at port 3000
app.listen(3000,async(req,res)=>{
    console.log("Server is up and running!");
})
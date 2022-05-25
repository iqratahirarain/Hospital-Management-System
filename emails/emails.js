require('dotenv').config()
const nodemailer = require("nodemailer");
var _ = require('lodash');


const forgetPassword = (email,user_id,role) => {

    const lowerCasedRole = _.lowerCase(role).split(" ").join("");;

    let transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        },
        tls:{
            rejectUnauthorized: false
        }
    })
    
    let mailOptions = {
        from :process.env.EMAIL,
        to:email,
        subject:"Set up a new password!",
        html: `<p>Click <a href="http://localhost:3000/${lowerCasedRole}-reset-password/${user_id}">here</a> to reset your password</p>`
    }
    
    transporter.sendMail(mailOptions,function(err,success){
        if(err){
            console.log(err)
        }else{
            console.log("Mail sent successfully!");
        }
    })
}

module.exports = {forgetPassword};
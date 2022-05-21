const jwt = require("jsonwebtoken");
const pool = require("../db/database")

const adminAuth = async ( req,res,next) => {

    try{
        const token = req.cookies['admin_token'];
        const decode = jwt.verify(token,'thisismysecret');
        const user = await pool.query("SELECT * FROM users WHERE user_id = $1",[decode._id]);
        // const user = await Admin.findOne({_id:decode._id});
        if(user.rowCount < 0){
            throw new Error();
        }

        req.user = user.rows[0];
        req.token = token;
        next()
    }catch(e){
        res.status(400).send({error:'Please authenticate!'})
    }
    

}

module.exports = adminAuth;
const jwt = require("jsonwebtoken");
const BlacklistModel = require("../models/blacklist.model");
const key = process.env.SecretKey;

const auth = (req,res,next) => {

    const token = req.headers.authorization?.split(" ")[1];

    try {
        if(token) {
            const blacklistedToken = BlacklistModel.find({token});
            if(blacklistedToken.length > 0) {
                res.status(400).json({error: "Session Expired"});
            }
            else {
                jwt.verify(token, key, (err, decoded) => {
                    if(decoded) {
                        const {username, userId, avatar} = decoded;
                        req.body.username = username;
                        req.body.userId = userId;
                        req.body.avatar = avatar;
    
                        next();
                    }
                    else {
                        res.status(400).send({message: "Not Authorized"});
                    }
                })
            }
        }
        else {
            res.status(400).send({error: "Authorization Failed, Please login"});
        }
    }
    catch(err) {
        res.status(400).send({error: err.message});
    }
}

module.exports = auth;
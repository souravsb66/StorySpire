const jwt = require("jsonwebtoken");

const auth = (req,res,next) => {

    const token = req.headers.authorization?.split(" ")[1];

    try {
        if(token) {
            jwt.verify(token, "puppy", (err, decoded) => {
                if(decoded) {
                    const {username, userId} = decoded;
                    req.body.username = username;
                    req.body.userId = userId;

                    next();
                }
                else {
                    res.status(400).send({message: "Not Authorized"});
                }
            })
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
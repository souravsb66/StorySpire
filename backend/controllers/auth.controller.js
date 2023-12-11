
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const BlacklistModel = require("../models/blacklist.model");
const key = process.env.SecretKey;

exports.registerUser = async (req,res) => {

    let {username, avatar, email, password} = req.body;

    const user = await UserModel.findOne({email});

    if(user) {
        res.status(400).json({error: "User already exists!"});
    }
    else {
        try {
            bcrypt.hash(password, 6, async(err, hash) => {
                if(err) {
                    res.status(400).json({error: err.message});
                }
                else {
                    const user = new UserModel({
                        username,
                        avatar,
                        email,
                        password: hash
                    })

                    await user.save();
                    const registeredUser = await UserModel.findOne({email});
                    const token = jwt.sign({userId: registeredUser._id, username, avatar}, key);
                    res.status(200).json({message: "New user registered!", token, user});
                }
            })
        }
        catch(err) {
            console.log(err);
            res.status(400).json({error: err.message});
        }
    }
}

exports.loginUser = async (req,res) => {

    const {email, password} = req.body;

    try {
        const user = await UserModel.findOne({email});

        bcrypt.compare(password, user.password, (err, result) => {
            if(result) {
                
                let {_id, username, avatar} = user;
                const token = jwt.sign({userId: _id, username, avatar}, key);
                res.status(200).json({message: "Login successful", token: token, user: user});
            }
            else {
                res.status(400).json({message: "Login failed, invalid credentials"})
            }
        })
    }
    catch(err) {
        console.log(err);
        res.status(400).json({error: err.message});
    }
}

exports.logoutUser = async (req,res) => {

    try {
        const token = req.headers.authorization.split(" ")[1];
    
        if(token) {
            const blacklistToken = new BlacklistModel({ token });
            await blacklistToken.save();
            res.status(200).json({message: "Logged out successfully"});
        }
        else {
            res.status(400).json({message: "Logout failed!"});
        }
    }
    catch(err) {
        res.status(400).json({message: "Something went wrong", error: err.message});
    }
}
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const userRouter = express.Router();

userRouter.post("/register", async (req,res) => {

    let {username, avatar, email, password} = req.body;

    const user = await UserModel.findOne({email});

    if(user) {
        res.status(400).send({error: "User already exists!"});
    }
    else {
        try {
            bcrypt.hash(password, 6, async(err, hash) => {
                if(err) {
                    res.status(400).send({error: err.message});
                }
                else {
                    const user = new UserModel({
                        username,
                        avatar,
                        email,
                        password: hash
                    })

                    await user.save();
                    res.status(200).send({message: "New user registered!", user});
                }
            })
        }
        catch(err) {
            console.log(err);
            res.status(400).send({error: err.message});
        }
    }
})

userRouter.post("/login", async (req,res) => {

    const {email, password} = req.body;

    try {
        const user = await UserModel.findOne({email});

        bcrypt.compare(password, user.password, (err, result) => {
            if(result) {
                
                let {_id, username} = user;
                const token = jwt.sign({userId: _id, username}, "puppy");
                res.status(200).send({message: "Login successful", token: token});
            }
            else {
                res.status(400).send({message: "Login failed, invalid credentials"})
            }
        })
    }
    catch(err) {
        console.log(err);
        res.status(400).send({error: err.message});
    }
})

// userRouter.get("/logout", async (req,res) => {

// })

module.exports = userRouter;
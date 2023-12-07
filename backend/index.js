const express = require("express");
const connection = require("./db");
const cors = require("cors");
const userRouter = require("./routes/user.route");
const blogRouter = require("./routes/blog.route");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/blogs", blogRouter);

app.get("/", (req,res) => {
    res.status(200).send({message: "Welcome to Home Page"});
})

app.listen(process.env.PORT, async () => {

    try {
        await connection;
        console.log("Conncted to DB");
        console.log(`Listening on Port ${process.env.PORT}`);
    }
    catch(err) {
        console.log(err);
    }
})
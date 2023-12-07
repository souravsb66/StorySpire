const express = require("express");
const BlogModel = require("../models/blog.model");
const auth = require("../middlewares/auth.middleware");

const blogRouter = express.Router();

blogRouter.get("/", auth, async (req,res) => {

    try {
        const blogs = await BlogModel.find();
        res.status(200).send(blogs);
    }
    catch(err) {
        console.log(err);
        res.status(400).send({error: err.message});
    }
})

blogRouter.post("/", auth, async (req,res) => {

    try {
        const blog = new BlogModel(req.body);
        await blog.save();

        res.status(200).send({message: "New Blog Created", blog});
    }
    catch(err) {
        console.log(err);
        res.status(400).send({error: err.message});
    }
})

blogRouter.patch("/:blogId", auth, async (req,res) => {

    const { blogId } = req.params;
    const {userId} = req.body;

    try {
        const blog = await BlogModel.findOne({_id: blogId});

        if(blog) {
            if(userId === blog.userId) {
                await BlogModel.findByIdAndUpdate({_id: blogId}, req.body);
                let updatedBlog = await BlogModel.findOne({_id: blogId});

                res.status(200).send({message: "Blog updated successfully", blog: updatedBlog});
            }
            else {
                res.status(200).send({error: "Not authorized!"});
            }
        }
        else {
            res.status(400).send({error: "Blog not found"});
        }
    }
    catch(err) {
        console.log(err);
        res.status(400).send({error: err.message});
    }
})

blogRouter.delete("/:blogId", auth, async (req,res) => {

    const { blogId } = req.params;
    const {userId} = req.body;

    try {
        const blog = await BlogModel.findOne({_id: blogId});

        if(blog) {
            if(userId === blog.userId) {
                await BlogModel.findByIdAndDelete({_id: blogId});

                res.status(200).send({message: "Blog deleted successfully"});
            }
            else {
                res.status(200).send({error: "Not authorized!"});
            }
        }
        else {
            res.status(400).send({error: "Blog not found"});
        }
    }
    catch(err) {
        console.log(err);
        res.status(400).send({error: err.message});
    }
})


module.exports = blogRouter;
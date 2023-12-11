const BlogModel = require("../models/blog.model");

exports.getAllBlogs = async (req,res) => {

    const {search, category, order} = req.query;
    const query = {};
    const sortOrder = {};
    try {
        if(search) {
            query.title = {$regex: search, $options: "i"}
        }
        if(category) {
            query.category = {$regex: category, $options: "i"}
        }

        sortOrder.date = order == "asc" ? 1 : -1;

        const blogs = await BlogModel.find(query).sort(sortOrder);
        res.status(200).send(blogs);
    }
    catch(err) {
        console.log(err);
        res.status(400).send({error: err.message});
    }
}

exports.postNewBlog = async (req,res) => {

    try {
        const blog = new BlogModel(req.body);
        await blog.save();

        res.status(200).send({message: "New Blog Created", blog});
    }
    catch(err) {
        console.log(err);
        res.status(400).send({error: err.message});
    }
}

exports.patchBlog = async (req,res) => {

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
}

exports.deleteBlog = async (req,res) => {

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
}
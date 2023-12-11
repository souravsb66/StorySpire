const express = require("express");
const BlogModel = require("../models/blog.model");
const auth = require("../middlewares/auth.middleware");

const blogController = require("../controllers/blog.controller");

const blogRouter = express.Router();
blogRouter.use(auth);

blogRouter.get("/", blogController.getAllBlogs);

blogRouter.post("/", blogController.postNewBlog);

blogRouter.patch("/:blogId", blogController.patchBlog);

blogRouter.delete("/:blogId", blogController.deleteBlog);


module.exports = blogRouter;
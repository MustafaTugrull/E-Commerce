const express = require("express");
const Blog = require("../models/Blog.js");
const route = express.Router();

route.post("/",async(req,res) => {
    try {
        const newBlog = new Blog(req.body);
        await newBlog.save();
        res.status(200).json(newBlog);
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

route.get("/",async(req,res) => {
    try {
        const blogs = await Blog.find({});
        res.status(200).json(blogs); 
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

route.get("/:blogId",async(req,res) =>{
    try {
        const blogId = req.params.blogId;
        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.status(404).json({error : "Blog not found"});
        }
        
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

route.put("/:blogId", async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const updatedInfo = req.body;

        const updatedBlog = await Blog.findByIdAndUpdate(blogId, updatedInfo, { new: true });

        if (!updatedBlog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

route.delete("/:blogId",async(req,res) => {
    try {
        const blogId = req.params.blogId;
        const deletedBlog = await Blog.findByIdAndDelete(blogId);

        if(!deletedBlog){
            return res.status(404).json({error : "Blog not found"});
        }
        res.status(200).json(deletedBlog);
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

module.exports = route;



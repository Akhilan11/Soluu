const Blog = require('../model/blogSchema');

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt : -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const postNewBlog = async (req, res) => {
    const { username, title, content, image } = req.body;

    try {
        const newBlog = new Blog({username, title, content, image});
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteBlog = async (req, res) => {
    const {id} = req.params;
    try {
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { username, title, content, image } = req.body;
    try {
        const blog = await Blog.findByIdAndUpdate(id, { username, title, content, image }, { new: true });
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getBlogbyId = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAllBlogs, postNewBlog, deleteBlog, updateBlog, getBlogbyId };
const Blog = require('../model/blogSchema');
const natural = require('natural');
const TfIdf = natural.TfIdf;

// Get similar blogs based on TF-IDF
const getSimilarBlogs = async (req, res) => {
    try {
        const currentBlog = await Blog.findById(req.params.id);
        if (!currentBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const allBlogs = await Blog.find({ _id: { $ne: req.params.id } });
        const tfidf = new TfIdf();

        allBlogs.forEach((blog, i) => {
            tfidf.addDocument(blog.title + ' ' + blog.content, i.toString());
        });

        const similarities = [];
        tfidf.tfidfs(currentBlog.title + ' ' + currentBlog.content, (i, measure) => {
            similarities.push({ blog: allBlogs[i], score: measure });
        });

        const similarBlogs = similarities
            .sort((a, b) => b.score - a.score)
            .slice(0, 3)
            .map(item => item.blog);

        res.status(200).json(similarBlogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching similar blogs' });
    }
};

// Get all blogs
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Post a new blog
const postNewBlog = async (req, res) => {
    const { username, title, content, image } = req.body;

    // Basic validation
    if (!username || !title || !content) {
        return res.status(400).json({ message: 'Username, title, and content are required' });
    }

    try {
        const newBlog = new Blog({ username, title, content, image });
        await newBlog.save();

        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete blog by ID
const deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update blog by ID
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
};

// Get blog by ID
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
};

module.exports = {
    getAllBlogs,
    postNewBlog,
    deleteBlog,
    updateBlog,
    getBlogbyId,
    getSimilarBlogs
};

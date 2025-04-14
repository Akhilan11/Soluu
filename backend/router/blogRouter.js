const express = require('express');
const router = express.Router();

const { getAllBlogs, postNewBlog, deleteBlog, updateBlog, getBlogbyId } = require('../controller/blogController');

const protect = require('../middleware/auth');

// GET all blogs
router.get('/', getAllBlogs);

// POST a new blog
router.post('/', protect, postNewBlog);

// DELETE a blog by ID
router.delete('/:id', protect ,deleteBlog);

// UPDATE a blog by ID
router.put('/:id', protect,updateBlog);

// GET a blog by ID
router.get('/:id', getBlogbyId);

module.exports = router;
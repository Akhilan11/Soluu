const express = require('express');
const router = express.Router();

const { getAllBlogs, postNewBlog, deleteBlog, updateBlog, getBlogbyId, getSimilarBlogs } = require('../controller/blogController');

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

// Get Similar blogs
router.get('/similar/:id', getSimilarBlogs);

module.exports = router;
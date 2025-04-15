const User = require('../model/userSchema');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ message: 'Email already exists' });
            }
            if (existingUser.username === username) {
                return res.status(400).json({ message: 'Username already exists' });
            }
        }

        const user = new User({ username, email, password });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '6h'
        });

        res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllEmails = async (req, res) => {
    try {
        const users = await User.find({}, 'email');
        const emails = users.map(user => user.email);
        res.status(200).json(emails);
    } catch (error) {
        console.error("Error fetching emails:", error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getAllEmails
};

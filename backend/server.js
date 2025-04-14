const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app  = express();


// connect to MongoDB
const connectDB = require('./config/db');
connectDB();

// middleware
app.use(express.json());
const cors = require('cors');
app.use(cors({
    origin : 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))

// routes
const blogRouter = require('./router/blogRouter');
app.use('/api/blogs', blogRouter);
const userRouter = require('./router/userRouter');
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const express = require("express");
const userRouter = require("./user.router");

require('dotenv').config();

const app = express();

const PORT = 5122;

app.use(express.json());

app.use('/users', userRouter)

app.get('/', (req, res) => {
    res.json({
        message: 'JWT Authentication using Node JS and MySQL',
    });
});

app.listen(PORT, (req, res) => {
    console.log(`Server listening on port ${PORT}`);
});

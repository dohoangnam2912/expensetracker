const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs');;
const app = express();

// Lấy Port từ .env file
require('dotenv').config();

// Gắn biến PORT
const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(cors());

// Routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))


const server = () => {
    db();
    app.listen(PORT, () => {
        console.log('listening to port: ', PORT);
    })
}

server();
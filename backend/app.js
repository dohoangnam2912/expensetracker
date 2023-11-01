const express = require('express');
const cors = require('cors');

const app = express();

// Lấy Port từ .env file
require('dotenv').config();

// Gắn biến PORT
const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(cors());


const server = () => {
    app.listen(PORT, () => {
        console.log('listening to port: ', PORT);
    })
}

server();
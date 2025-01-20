const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const userHandler = require('./router/userHandler')

// express app initialization
const app = express();
app.use(express.json())
const port = process.env.PORT || 3000;

// Middleware
const corsOptions = {
    origin: ["http://localhost:5173"],
    credentials: true,
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(morgan('dev'))


mongoose.connect(`mongodb://localhost:27017/Name`)
    .then(() => console.log("☘️  connection successful"))
    .catch((err) => console.log(err));

// application routes
app.use('/user', userHandler)

// default error handler
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
}

// default route
app.get('/', (req, res) => {
    res.send('Hello Programmer. This Server For [Name] Website ❤️')
})

app.listen(port, () => {
    console.log(`☘️  You successfully connected to Server: ${port}`);
})
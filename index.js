const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
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

// create a jwt token
app.post('/jwt', async (req, res) => {
    try {
        const userInfo = req.body
        const token = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        }).send({ success: true })
    } catch (err) {
        res.status(500).send({
            error: 'There was a server-side error',
            details: err.message
        });
    }
})

// create a jwt token
app.get('/logout', async (req, res) => {
    try {
        res.clearCookie('kutto_Token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            path: '/',
        }).send({ success: true });
    } catch (err) {
        res.status(500).send({
            error: 'There was a server-side error',
            details: err.message
        });
    }
})

// application routes
app.use('/user', userHandler)

// default route
app.get('/', (req, res) => {
    res.send('Hello Programmer. This Server For [Name] Website ❤️')
})

app.listen(port, () => {
    console.log(`☘️  You successfully connected to Server: ${port}`);
})
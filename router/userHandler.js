const express = require('express');
const mongoose = require('mongoose');
const userSchema = require('../schemas/userSchema')
const router = express.Router();

const User = new mongoose.model('User', userSchema);

// get all users
router.get('/all', async (req, res) => {

})

// get a user role
router.get('/:id', async (req, res) => {

})

// post a user
router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).send({
            message: 'User inserted successfully!'
        });
    } catch (err) {
        res.status(500).send({
            error: 'There was a server-side error',
            details: err.message
        });
    }
});


// update a user
router.put('/:id', async (req, res) => {

})

module.exports = router;
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// collection
const users = mongoose.connection.collection('users');

// Verify Jwt Token
const verifyToken = async (req, res, next) => {
    const token = req.cookies.TokenName;
    if (!token) return res.status(401).send({ error: 'unauthorized access' });

    // Verify Token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) return res.status(401).send({ error: 'unauthorized access' });

        req.user = decoded;
        next();
    });
};

// Verify Admin
const verifyAdmin = async (req, res, next) => {
    const email = req?.user?.email;
    const query = { email };
    const user = await users.findOne(query);
    const isAdmin = user?.role === 'admin';

    if (!user || !isAdmin) {
        return res.status(403).send({ message: 'Forbidden access. Only admins have access!' });
    }

    next();
};

module.exports = { verifyToken, verifyAdmin };
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const SECRET_KEY='123456789';
const loginFunction = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required." });
        }

        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(404).json({ error: "User does not exist." });
        }
 
        const isPasswordValid = await bcrypt.compare(password, userExist.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Incorrect password." });
        }
        const userid=userExist._id
        const token = generateToken(userExist._id);
        res.status(201).json({ message: "Login successful.", token ,userid});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error." });
    }
};

const generateToken = (id) => {
    return jwt.sign({ id }, SECRET_KEY, {
        expiresIn: '1d',
    });
};

module.exports = loginFunction;

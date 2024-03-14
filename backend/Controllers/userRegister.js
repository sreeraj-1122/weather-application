const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const registerUser = async (req, res) => {
    try {
       
        const { name, email, password } = req.body;

        if (!name || !email || !password ) {
            return res.status(400).json({ error: "Fill required fields." });
        }

        if (password.length < 6 || password.length >= 12) {
            return res.status(400).json({ error: "Password must be between 6 and 12 characters." });
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ error: "Email already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json(userData);
    } catch (error) {
        console.error(error);
        if (error.code === 11000) { // MongoDB duplicate key error
            return res.status(400).json({ error: "Email already exists." });
        }
        res.status(500).json({ error: "Server error." });
    }
};

module.exports = registerUser;

const mongoose = require("mongoose");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");  
const jwt = require("jsonwebtoken");
const JWT_SECRET = "abhaypawar12345"; 

const signUpController = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(409).json({ message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
        return res.status(201).json({ message: "Signup was successful!", token }); 

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred during signup.", error });
    }
}

const logInController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({ message: "Invalid email or password." }); 
        }

        const compare = await bcrypt.compare(password, existingUser.password);
        if (!compare) {
            return res.status(401).json({ message: "Invalid email or password." }); 
        }

        const token = jwt.sign({ id: existingUser._id }, JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: "Login successfully!", token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred during login.", error });
    }
}

module.exports = { signUpController, logInController };

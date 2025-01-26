const express = require('express');
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/generatetoken");
const usermodel = require('../models/usermodel');
const router = express.Router();
require('dotenv').config();
const jwt = require("jsonwebtoken");

module.exports.registerUser = async function (req, res) {
    try {
        let { email, password, fullname } = req.body;

        // Check if email already exists in the database
        const existingUser = await usermodel.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User already exists with this email.");
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user in the database
        const user = await usermodel.create({
            email,
            password: hashedPassword,
            fullname,
        });

        // Generate a JWT token
        const token = generateToken(user);

        // Set the token in the cookie
        res.cookie("token", token, { httpOnly: true });

        // Send a response
        res.status(201).send("User created successfully.");
    } catch (err) {
        // Error handling
        console.error(err);
        res.status(500).send("Server error.");
    }
};
module.exports.loginuser = async function(req, res) {
    let { email, password } = req.body;
    // Use the correct function name 'findOne'
    let user = await usermodel.findOne({ email: email });
    if (!user) {
        return res.status(400).send("Email or password incorrect.");
    }

    // Compare password with the hashed password
    bcrypt.compare(password, user.password, function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).send("Server error.");
        }
        if (result) {
            // Passwords match, generate a JWT token
            const token = generateToken(user);
            res.cookie("token", token, { httpOnly: true });
            res.send("Login successful.");
        } else {
            // Password does not match
            res.status(400).send("Email or password incorrect.");
        }
    });
};

// Relative Path: ./controllers/authController.js
// -----------------------------------------------------------------------------
// This file contains the core logic for user registration and login.

import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// --- User Registration ---
export const registerUser = async (req, res) => {
    // Corrected destructuring from 'of' to '='
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({ message: 'User with this email or username already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.status(201).json({
            token,
            user: { id: user.id, username: user.username, email: user.email },
        });

    } catch (error) {
        console.error(`Error in registerUser: ${error.message}`);
        res.status(500).send('Server Error');
    }
};

// --- User Login ---
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.json({
            token,
            user: { id: user.id, username: user.username, email: user.email },
        });

    } catch (error) {
        console.error(`Error in loginUser: ${error.message}`);
        res.status(500).send('Server Error');
    }
};

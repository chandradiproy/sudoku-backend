// Relative Path: ./routes/authRoutes.js
// -----------------------------------------------------------------------------
// This file defines the API endpoints and connects them to the controller logic.

import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Authenticate a user and get a token
router.post('/login', loginUser);

export default router;

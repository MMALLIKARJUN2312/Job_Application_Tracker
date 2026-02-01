import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js'
import AppError from '../utils/errorHandler.js'
import asyncWrapper from '../utils/asyncHandler.js'

export const registerUser = asyncWrapper(async (req, res) => {

    const { name, email, password } = req.body;

    // Input validation
    if (!name || !email || !password) {
        throw new AppError("All fields are required", 400)
    }

    // Check if user already exists
    const userExists = await User.findOne({ email })
    if (userExists) {
        throw new AppError("User already exists", 400)
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating a user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    res.status(201).json({
        message: "User registered successfully",
        user: {
            userId: user._id,
            name: user.name,
            email: user.email
        }
    });
})

export const loginUser = asyncWrapper(async (req, res) => {
    const { email, password } = req.body;

    // Input Validation
    if (!email || !password) {
        throw new AppError("All fields are required", 400)
    }

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError("User not found", 400);
    }

    // Checking if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new AppError("Invalid Credentials", 401);
    }

    // Generate a token
    const token = generateToken(user._id);

    // Send response
    res.status(200).json({
        message: "Login Successful", token,
        user: {
            userId: user._id,
            name: user.name,
            email: user.email
        }
    });
})
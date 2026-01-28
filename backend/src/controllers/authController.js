import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        // Input validation
        if (!name || !email || !password) {
            return res.status(400).json({message : "All fields are required"})
        }

        // Check if user already exists
        const userExists = await User.findOne({email})
        if (userExists) {
            return res.status(400).json({message : "User already exists"})
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creating a user
        const user = await User.create({
            name,
            email,
            password : hashedPassword
        })

        res.status(201).json({message : "User registered successfully",
        user : {
            id : user._id,
            name : user.name,
            email : user.email
        }
    });
    } catch (error) {
        console.error(error);
        res.status(500).json({message : "Internal Server Error"})
    }
}
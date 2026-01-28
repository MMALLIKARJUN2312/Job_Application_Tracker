import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDatabase from './config/db.js';
import authRoutes from './routes/authRoutes.js'

// Load environment variables
dotenv.config()

// Connect to Database
connectDatabase();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes);

app.get('/', (req,res) => {
    res.send("API is running...")
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on the port : ${PORT}`)
});
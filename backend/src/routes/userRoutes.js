import express from 'express';
import {protectedRoute} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/profile',protectedRoute, (req, res) => {
    res.json({message : "Access granted to the protected route", user : req.user});
})

export default router;
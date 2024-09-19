import jwt from 'jsonwebtoken';
import User from '../models/user_model.js';

export const protectedRoute = async (req, res, next) => {
    try {
        console.log(req.cookies.jwt)
    const token = req.cookies.jwt;

        if (!token) {
            return res.status(400).json({ error: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(400).json({ error: 'Invalid token' });
        }

        console.log(decoded)
        const user = await User.findOne({ _id: decoded.userid });

        if (!user) {
            return res.status(404).json({ error: 'user not founded'});
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
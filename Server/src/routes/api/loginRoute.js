const express = require('express');
const router = express.Router();
import { generateToken, handleTokenError } from '../../models/jwtModel';
import User from '../../models/userModel';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//  When doing a form submittion from the front end, the data should be
//  accessed from .body


router.get('/login', async (req, res) => {
    try {
        const { userName, password } = req.body;

        if (!userName || !password) {
            return res.status(400).json({
              error: 'Both username and password are required'
            });
        }

        const user = await User.findOne({
            where: { userName }
        });

        if (!user) {
            return res.status(401).json({
                error: 'Invalid username'
            })
        }

        const validPassword = await user.comparePassword(password);

        if (!validPassword) {
            return res.status(401).json({
                error: 'Invalid password'
            })
        }

        await user.update({
            lastLogin: new Date()
        })
        
        const token = generateToken(user);

        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                userName: user.userName,
                role: user.role
            }
        })

    } catch (error) {
        handleTokenError();
    }
})

export default adminJWT;
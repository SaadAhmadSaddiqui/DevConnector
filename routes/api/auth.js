const express = require('express');
const config = require('config'); // Importing config files
const jwt = require('jsonwebtoken'); // Importing JWT
const bCrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator'); // Uses the Express Validator

const auth = require('../../middleware/auth');
const User = require('../../models/User');

const router = express.Router();

// @route   GET api/auth
// @desc    Authenticate user and get token
// @access  Public
router.get('/', auth, async (req, res) => 
{
    try 
    {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch (error) 
    {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post
('/', 
    [
        check('email', 'Please include a valid Email').isEmail(),
        check('password', 'Password is required.').exists()
    ],
    async (req, res) =>
    {
        const errors = validationResult(req);
        if (!errors.isEmpty())
        {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try
        {
            // See if the user exists

            const user = await User.findOne({ email });

            if (!user)
            {
                return res.status(400).json({ errors: [{ msg: 'Invalid Email Address or Password!' }] });
            }

            // Check password

            const isMatch = await bCrypt.compare(password, user.password);

            if (!isMatch)
            {
                return res.status(400).json({ errors: [{ msg: 'Invalid Email Address or Password!' }] });
            }

            // return JSON Web Token (JWT).

            const payload = 
            {
                user: 
                {
                    id: user.id,
                }
            };

            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => 
            { 
                if (err) 
                {
                    throw err;
                }
                res.json({ token });
            });
        }
        catch (error)
        {
            console.error(error.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
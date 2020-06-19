const express = require('express');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

const auth = require('../../middleware/auth');

const router = express.Router();

// @route   GET api/profile/me
// @desc    Get Current User's Profile
// @access  Private (Because we're getting the profile by user ID)
router.get('/me', auth, async (req, res) => 
{
    try 
    {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if (!profile) 
        {
            return res.status(400).json({ msg: 'There is no profile for this user!' });
        }

        res.json(profile);
    }
    catch (error) 
    {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
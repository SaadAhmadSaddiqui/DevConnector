const express = require( 'express' ); // Gets Express (Whatever that is)
const gravatar = require( 'gravatar' );// Gets the avatar from the email
const bCrypt = require( 'bcryptjs' ); // Library for password encryption
const { check, validationResult } = require( 'express-validator' ); // Uses the Express Validator

const User = require( '../../models/User' );// Gets the User Model

const router = express.Router(); // Uses express to route to the folders


// @route   POST api/users
// @desc    Register User
// @access  Public
router.post( '/', 
    [
        check( 'name', 'Name is required!' ).not().isEmpty(),
        check( 'email', 'Please include a valid Email' ).isEmail(),
        check( 'password', 'Please enter a password with 6 or more characters' ).isLength( { min: 6 } )
    ],
    async ( req, res ) =>
    {
        const errors = validationResult( req );
        if ( !errors.isEmpty() )
        {
            return res.status( 400 ).json( { errors: errors.array() } );
        }

        const { name, email, password } = req.body;

        try
        {
        // See if the user exists

            let user = await User.findOne( { email } );

            if ( user )
            {
                res.status( 400 ).json( { errors: [{ msg: 'User already exists!' }] } );
            }

            // Get users gravatar

            const avatar = gravatar.url( email,
                {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                }
            );

            user = new User(
                {
                    name,
                    email,
                    avatar,
                    password
                }
            );

            // Encrypt the password using BCrypt

            const salt = await bCrypt.genSalt( 10 );

            user.password = await bCrypt.hash();

            // return JSON Web Token (JWT).

        }
        catch ( error )
        {
            console.error( error.message );
            res.status( 500 ).send( 'Server error' );
        }


        res.send( 'User Routes' );
    }
);

module.exports = router;
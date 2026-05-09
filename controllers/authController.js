const User = require('../models/User');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

/* ====================================
   GENERATE JWT
==================================== */

const generateToken = (id) => {

    return jwt.sign(

        { id },

        process.env.JWT_SECRET,

        {

            expiresIn: '2h'

        }

    );

};

/* ====================================
   REGISTER USER
==================================== */

const registerUser = async (req, res) => {

    try {

        const {

            firstName,

            lastName,

            email,

            phone,

            age,

            gender,

            password

        } = req.body;

        // CHECK EXISTING USER

        const existingUser = await User.findOne({

            email

        });

        if (existingUser) {

            return res.status(400).json({

                success: false,

                message: 'User already exists'

            });

        }

        // HASH PASSWORD

        const salt =
            await bcrypt.genSalt(10);

        const hashedPassword =
            await bcrypt.hash(
                password,
                salt
            );

        // CREATE USER

        const user = await User.create({

            firstName,

            lastName,

            email,

            phone,

            age,

            gender,

            password: hashedPassword

        });

        res.status(201).json({

            success: true,

            message: 'User Registered Successfully',

            token: generateToken(user._id),

            data: {

                id: user._id,

                firstName: user.firstName,

                lastName: user.lastName,

                email: user.email,

                role: user.role

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ====================================
   LOGIN USER
==================================== */

const loginUser = async (req, res) => {

    try {

        const {

            email,

            password

        } = req.body;

        // FIND USER

        const user = await User.findOne({

            email

        });

        if (!user) {

            return res.status(400).json({

                success: false,

                message: 'Invalid Email or Password'

            });

        }

        // CHECK PASSWORD

        const isMatch =
            await bcrypt.compare(

                password,

                user.password

            );

        if (!isMatch) {

            return res.status(400).json({

                success: false,

                message: 'Invalid Email or Password'

            });

        }

        // SUCCESS LOGIN

        res.status(200).json({

            success: true,

            message: 'Login Successful',

            token: generateToken(user._id),

            data: {

                id: user._id,

                firstName: user.firstName,

                lastName: user.lastName,

                email: user.email,

                role: user.role

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ====================================
   EXPORT
==================================== */

module.exports = {

    registerUser,

    loginUser

};
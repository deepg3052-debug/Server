const User = require('../models/User');

/* ====================================
   GET ALL USERS
==================================== */

const getUsers = async (req, res) => {

    try {

        const users = await User.find();

        res.status(200).json({

            success: true,

            data: users

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ====================================
   GET USER BY ID
==================================== */

const getUserById = async (req, res) => {

    try {

        const user = await User.findById(

            req.params.id

        ).select('-password');

        if (!user) {

            return res.status(404).json({

                success: false,

                message: 'User not found'

            });

        }

        res.status(200).json({

            success: true,

            data: user

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ====================================
   UPDATE USER
==================================== */

const updateUser = async (req, res) => {

    try {

        const { phone, age, gender } =
            req.body;

        const user =
            await User.findByIdAndUpdate(

                req.params.id,

                {

                    phone,

                    age,

                    gender

                },

                {

                    new: true,

                    runValidators: true

                }

            ).select('-password');

        if (!user) {

            return res.status(404).json({

                success: false,

                message: 'User not found'

            });

        }

        res.status(200).json({

            success: true,

            message: 'User Updated',

            data: user

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ====================================
   DELETE USER
==================================== */

const deleteUser = async (req, res) => {

    try {

        await User.findByIdAndDelete(

            req.params.id

        );

        res.status(200).json({

            success: true,

            message: 'User Deleted'

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

    getUsers,

    getUserById,

    updateUser,

    deleteUser

};
const jwt = require('jsonwebtoken');

/* ====================================
   AUTH MIDDLEWARE
==================================== */

const protect = async (req, res, next) => {

    let token;

    try {

        // ====================================
        // CHECK AUTH HEADER
        // ====================================

        if (

            req.headers.authorization &&

            req.headers.authorization.startsWith('Bearer')

        ) {

            // ====================================
            // GET TOKEN
            // ====================================

            token = req.headers.authorization.split(' ')[1];

            // ====================================
            // VERIFY TOKEN
            // ====================================

            const decoded = jwt.verify(

                token,

                process.env.JWT_SECRET
            );

            // ====================================
            // SAVE USER DATA
            // ====================================

            req.user = decoded;

            next();

        } else {

            return res.status(401).json({

                success: false,

                message: 'Not authorized, token missing'

            });

        }

    } catch (error) {

        return res.status(401).json({

            success: false,

            message: 'Token failed',

            error: error.message

        });

    }

};

/* ====================================
   ADMIN MIDDLEWARE
==================================== */

const adminOnly = (req, res, next) => {

    try {

        // ====================================
        // CHECK ROLE
        // ====================================

        if (req.user.role === 'admin') {

            next();

        } else {

            return res.status(403).json({

                success: false,

                message: 'Admin access only'

            });

        }

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: 'Authorization failed'

        });

    }

};

/* ====================================
   TRAINER MIDDLEWARE
==================================== */

const trainerOnly = (req, res, next) => {

    try {

        // ====================================
        // CHECK ROLE
        // ====================================

        if (

            req.user.role === 'trainer' ||

            req.user.role === 'admin'

        ) {

            next();

        } else {

            return res.status(403).json({

                success: false,

                message: 'Trainer access only'

            });

        }

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: 'Authorization failed'

        });

    }

};

/* ====================================
   EXPORT MIDDLEWARE
==================================== */

module.exports = {

    protect,

    adminOnly,

    trainerOnly

};
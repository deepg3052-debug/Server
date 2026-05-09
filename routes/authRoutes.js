const express = require('express');

const router = express.Router();

/* ====================================
   IMPORT CONTROLLER
==================================== */

const {

    registerUser,

    loginUser

} = require('../controllers/authController');

/* ====================================
   TEST ROUTE
==================================== */

router.get('/', (req, res) => {

    res.json({

        success: true,

        message: 'Auth Route Working'

    });

});

/* ====================================
   REGISTER ROUTE
==================================== */

router.post(

    '/register',

    registerUser

);

/* ====================================
   LOGIN ROUTE
==================================== */

router.post(

    '/login',

    loginUser

);

/* ====================================
   EXPORT ROUTER
==================================== */

module.exports = router;
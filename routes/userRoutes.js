const express = require('express');

const router = express.Router();

/* ====================================
   IMPORT MIDDLEWARE
==================================== */

const {

    protect

} = require('../middleware/authMiddleware');

/* ====================================
   IMPORT CONTROLLERS
==================================== */

const {

    getUsers,

    getUserById,

    updateUser,

    deleteUser

} = require('../controllers/userController');

/* ====================================
   GET ALL USERS
==================================== */

// PROTECTED ROUTE

router.get(

    '/',

    protect,

    getUsers

);

/* ====================================
   GET USER BY ID
==================================== */

router.get(

    '/:id',

    protect,

    getUserById

);

/* ====================================
   UPDATE USER
==================================== */

router.put(

    '/:id',

    protect,

    updateUser

);

/* ====================================
   DELETE USER
==================================== */

router.delete(

    '/:id',

    protect,

    deleteUser

);

/* ====================================
   EXPORT ROUTER
==================================== */

module.exports = router;

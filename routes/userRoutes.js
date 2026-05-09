const express = require('express');

const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

/* ====================================
   IMPORT CONTROLLER
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

router.get('/', getUsers);

/* ====================================
   GET USER BY ID
==================================== */

router.get('/:id', protect, getUserById);

/* ====================================
   UPDATE USER
==================================== */

router.put('/:id', protect, updateUser);

/* ====================================
   DELETE USER
==================================== */

router.delete('/:id', deleteUser);

/* ====================================
   EXPORT ROUTER
==================================== */

module.exports = router;
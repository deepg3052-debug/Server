const express = require('express');

const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

/* ====================================
   IMPORT CONTROLLER
==================================== */

const {

    getMemberships,

    createMembership,

    updateMembership,

    deleteMembership

} = require('../controllers/membershipController');

const {

    getUserMembership

} = require('../controllers/membershipRequestController');

/* ====================================
   GET MEMBERSHIPS
==================================== */

router.get('/', getMemberships);

/* ====================================
   GET USER MEMBERSHIP
==================================== */

router.get('/user/:id', protect, getUserMembership);

/* ====================================
   CREATE MEMBERSHIP
==================================== */

router.post('/', protect, createMembership);

/* ====================================
   UPDATE MEMBERSHIP
==================================== */

router.put('/:id', protect, updateMembership);

/* ====================================
   DELETE MEMBERSHIP
==================================== */

router.delete('/:id', protect, deleteMembership);

/* ====================================
   EXPORT ROUTER
==================================== */

module.exports = router;
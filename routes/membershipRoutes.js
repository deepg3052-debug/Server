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

    getMemberships,

    createMembership,

    updateMembership,

    deleteMembership

} = require('../controllers/membershipController');

const {

    getUserMembership

} = require('../controllers/membershipRequestController');

/* ====================================
   GET ALL MEMBERSHIPS
==================================== */

// PUBLIC ROUTE

router.get(

    '/',

    getMemberships

);

/* ====================================
   GET USER MEMBERSHIP
==================================== */

// PROTECTED ROUTE

router.get(

    '/user/:id',

    protect,

    getUserMembership

);

/* ====================================
   CREATE MEMBERSHIP
==================================== */

// PROTECTED ROUTE

router.post(

    '/',

    protect,

    createMembership

);

/* ====================================
   UPDATE MEMBERSHIP
==================================== */

router.put(

    '/:id',

    protect,

    updateMembership

);

/* ====================================
   DELETE MEMBERSHIP
==================================== */

router.delete(

    '/:id',

    protect,

    deleteMembership

);

/* ====================================
   EXPORT ROUTER
==================================== */

module.exports = router;

const express = require('express');

const router = express.Router();

/* ====================================
   CONTROLLER IMPORTS
==================================== */

const {

    createMembershipRequest,

    getMembershipRequests,

    approveMembershipRequest,

    rejectMembershipRequest

} = require(

    '../controllers/membershipRequestController'

);

/* ====================================
   CREATE MEMBERSHIP REQUEST
==================================== */

router.post(

    '/',

    createMembershipRequest

);

/* ====================================
   GET ALL MEMBERSHIP REQUESTS
==================================== */

router.get(

    '/',

    getMembershipRequests

);

/* ====================================
   APPROVE MEMBERSHIP REQUEST
==================================== */

router.put(

    '/:id/approve',

    approveMembershipRequest

);

/* ====================================
   REJECT MEMBERSHIP REQUEST
==================================== */

router.put(

    '/:id/reject',

    rejectMembershipRequest

);

/* ====================================
   EXPORT ROUTER
==================================== */

module.exports = router;
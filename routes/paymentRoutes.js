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

    getPayments,

    createPayment,

    updatePayment,

    deletePayment

} = require('../controllers/paymentController');

/* ====================================
   GET ALL PAYMENTS
==================================== */

// PROTECTED ROUTE

router.get(

    '/',

    protect,

    getPayments

);

/* ====================================
   CREATE PAYMENT
==================================== */

// PROTECTED ROUTE

router.post(

    '/',

    protect,

    createPayment

);

/* ====================================
   UPDATE PAYMENT
==================================== */

router.put(

    '/:id',

    protect,

    updatePayment

);

/* ====================================
   DELETE PAYMENT
==================================== */

router.delete(

    '/:id',

    protect,

    deletePayment

);

/* ====================================
   EXPORT ROUTER
==================================== */

module.exports = router;

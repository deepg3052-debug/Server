const express = require('express');

const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

/* ====================================
   IMPORT CONTROLLER
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

router.get('/', protect, getPayments);

/* ====================================
   CREATE PAYMENT
==================================== */

router.post('/', protect, createPayment);

/* ====================================
   UPDATE PAYMENT
==================================== */

router.put('/:id', protect, updatePayment);

/* ====================================
   DELETE PAYMENT
==================================== */

router.delete('/:id', protect, deletePayment);

/* ====================================
   EXPORT ROUTER
==================================== */

module.exports = router;
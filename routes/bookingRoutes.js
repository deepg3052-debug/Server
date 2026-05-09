const express = require('express');

const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

/* ====================================
   IMPORT CONTROLLER
==================================== */

const {

    getBookings,

    createBooking,

    updateBooking,

    deleteBooking

} = require('../controllers/bookingController');

/* ====================================
   GET ALL BOOKINGS
==================================== */

router.get('/', protect, getBookings);

/* ====================================
   CREATE BOOKING
==================================== */

router.post('/', protect, createBooking);

/* ====================================
   UPDATE BOOKING
==================================== */

router.put('/:id', protect, updateBooking);

/* ====================================
   DELETE BOOKING
==================================== */

router.delete('/:id', protect, deleteBooking);

/* ====================================
   EXPORT ROUTER
==================================== */

module.exports = router;
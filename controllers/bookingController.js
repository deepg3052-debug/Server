const Booking = require('../models/Booking');

/* ====================================
   GET BOOKINGS
==================================== */

const getBookings = async (req, res) => {

    try {

        const bookings = await Booking.find();

        res.status(200).json({

            success: true,

            data: bookings

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ====================================
   CREATE BOOKING
==================================== */

const createBooking = async (req, res) => {

    try {

        const booking = await Booking.create(req.body);

        res.status(201).json({

            success: true,

            message: 'Booking Created Successfully',

            data: booking

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ====================================
   UPDATE BOOKING
==================================== */

const updateBooking = async (req, res) => {

    try {

        const booking = await Booking.findByIdAndUpdate(

            req.params.id,

            req.body,

            { new: true }

        );

        res.status(200).json({

            success: true,

            message: 'Booking Updated',

            data: booking

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ====================================
   DELETE BOOKING
==================================== */

const deleteBooking = async (req, res) => {

    try {

        await Booking.findByIdAndDelete(req.params.id);

        res.status(200).json({

            success: true,

            message: 'Booking Deleted'

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ====================================
   EXPORT CONTROLLER
==================================== */

module.exports = {

    getBookings,

    createBooking,

    updateBooking,

    deleteBooking

};
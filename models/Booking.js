const mongoose = require('mongoose');

/* ====================================
   BOOKING SCHEMA
==================================== */

const bookingSchema = new mongoose.Schema({

    // USER ID
    user: {

        type: mongoose.Schema.Types.ObjectId,

        ref: 'User',

        required: true
    },

    // FULL NAME
    fullName: {

        type: String,

        required: true,

        trim: true
    },

    // EMAIL
    email: {

        type: String,

        required: true,

        trim: true,

        lowercase: true
    },

    // PHONE NUMBER
    phone: {

        type: String,

        required: true
    },

    // SERVICE TYPE
    service: {

        type: String,

        required: true,

        enum: [

            'Strength Training',

            'Cardio Fitness',

            'Yoga Classes',

            'Personal Training',

            'CrossFit',

            'Weight Loss Program'

        ]
    },

    // TRAINER NAME
    trainer: {

        type: String,

        required: true
    },

    // BOOKING DATE
    bookingDate: {

        type: Date,

        required: true
    },

    // BOOKING TIME
    bookingTime: {

        type: String,

        required: true
    },

    // MEMBERSHIP PLAN
    membershipPlan: {

        type: String,

        enum: [
            'Basic',
            'Standard',
            'Premium'
        ],

        default: 'Basic'
    },

    // BOOKING STATUS
    status: {

        type: String,

        enum: [
            'Pending',
            'Approved',
            'Completed',
            'Cancelled'
        ],

        default: 'Pending'
    },

    // ADDITIONAL MESSAGE
    message: {

        type: String,

        trim: true,

        default: ''
    },

    // CREATED DATE
    createdAt: {

        type: Date,

        default: Date.now
    }

});

/* ====================================
   EXPORT MODEL
==================================== */

module.exports = mongoose.model(
    'Booking',
    bookingSchema
);
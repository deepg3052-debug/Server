const mongoose = require('mongoose');

/* ====================================
   PAYMENT SCHEMA
==================================== */

const paymentSchema = new mongoose.Schema({

    // USER ID
    user: {

        type: mongoose.Schema.Types.ObjectId,

        ref: 'User',

        required: true
    },

    // MEMBER NAME
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

    // MEMBERSHIP PLAN
    membershipPlan: {

        type: String,

        required: true,

        enum: [
            'Basic',
            'Standard',
            'Premium'
        ]
    },

    // PAYMENT AMOUNT
    amount: {

        type: Number,

        required: true
    },

    // PAYMENT METHOD
    paymentMethod: {

        type: String,

        required: true,

        enum: [
            'Cash',
            'Card',
            'UPI',
            'Net Banking'
        ]
    },

    // TRANSACTION ID
    transactionId: {

        type: String,

        required: true,

        unique: true
    },

    // PAYMENT STATUS
    paymentStatus: {

        type: String,

        enum: [
            'Pending',
            'Completed',
            'Failed'
        ],

        default: 'Pending'
    },

    // PAYMENT DATE
    paymentDate: {

        type: Date,

        default: Date.now
    },

    // MEMBERSHIP START DATE
    startDate: {

        type: Date,

        required: true
    },

    // MEMBERSHIP END DATE
    endDate: {

        type: Date,

        required: true
    }

});

/* ====================================
   EXPORT MODEL
==================================== */

module.exports = mongoose.model(
    'Payment',
    paymentSchema
);
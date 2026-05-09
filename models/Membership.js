const mongoose = require('mongoose');

/* ====================================
   MEMBERSHIP SCHEMA
==================================== */

const membershipSchema = new mongoose.Schema({

    // MEMBERSHIP NAME
    membershipName: {

        type: String,

        required: true,

        unique: true,

        enum: [
            'Basic',
            'Standard',
            'Premium'
        ]
    },

    // PRICE
    price: {

        type: Number,

        required: true
    },

    // DURATION
    duration: {

        type: String,

        required: true,

        enum: [
            '1 Month',
            '3 Months',
            '6 Months',
            '12 Months'
        ]
    },

    // DESCRIPTION
    description: {

        type: String,

        required: true,

        trim: true
    },

    // FEATURES
    features: [

        {

            type: String

        }

    ],

    // PERSONAL TRAINER ACCESS
    personalTrainer: {

        type: Boolean,

        default: false
    },

    // GROUP CLASSES ACCESS
    groupClasses: {

        type: Boolean,

        default: false
    },

    // DIET PLAN ACCESS
    dietPlan: {

        type: Boolean,

        default: false
    },

    // LOCKER FACILITY
    lockerFacility: {

        type: Boolean,

        default: false
    },

    // STEAM & SAUNA ACCESS
    steamAndSauna: {

        type: Boolean,

        default: false
    },

    // 24/7 ACCESS
    fullTimeAccess: {

        type: Boolean,

        default: false
    },

    // MEMBERSHIP STATUS
    status: {

        type: String,

        enum: [
            'active',
            'inactive'
        ],

        default: 'active'
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
    'Membership',
    membershipSchema
);
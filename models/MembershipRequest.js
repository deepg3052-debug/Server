const mongoose = require('mongoose');

/* ====================================
   MEMBERSHIP REQUEST SCHEMA
==================================== */

const membershipRequestSchema =
    new mongoose.Schema({

        userId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: 'User',

            required: true

        },

        userName: {

            type: String,

            required: true

        },

        email: {

            type: String,

            required: true

        },

        plan: {

            type: String,

            required: true

        },

        price: {

            type: Number,

            required: true

        },

        status: {

            type: String,

            enum: [

                'pending',

                'approved',

                'rejected'

            ],

            default: 'pending'

        },

        createdAt: {

            type: Date,

            default: Date.now

        },

        approvedAt: {

            type: Date,

            default: null

        },

        paymentConfirmed: {

            type: Boolean,

            default: false

        },

        rejectedAt: {

            type: Date,

            default: null

        },

        rejectionReason: {

            type: String,

            default: null

        }

    });

module.exports = mongoose.model(

    'MembershipRequest',

    membershipRequestSchema

);
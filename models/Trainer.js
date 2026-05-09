const mongoose = require('mongoose');

/* ====================================
   TRAINER SCHEMA
==================================== */

const trainerSchema = new mongoose.Schema({

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

        unique: true,

        trim: true,

        lowercase: true
    },

    // PHONE NUMBER
    phone: {

        type: String,

        required: true
    },

    // SPECIALIZATION
    specialization: {

        type: String,

        required: true,

        enum: [

            'Strength Training',

            'Cardio Fitness',

            'Yoga',

            'CrossFit',

            'Weight Loss',

            'Bodybuilding',

            'Personal Training'

        ]
    },

    // EXPERIENCE IN YEARS
    experience: {

        type: Number,

        required: true,

        min: 0
    },

    // GENDER
    gender: {

        type: String,

        enum: [
            'male',
            'female',
            'other'
        ],

        required: true
    },

    // AGE
    age: {

        type: Number,

        required: true,

        min: 18
    },

    // SALARY
    salary: {

        type: Number,

        required: true
    },

    // SHIFT TIMING
    shift: {

        type: String,

        enum: [
            'Morning',
            'Evening',
            'Full Day'
        ],

        default: 'Full Day'
    },

    // PROFILE IMAGE
    profileImage: {

        type: String,

        default: ''
    },

    // STATUS
    status: {

        type: String,

        enum: [
            'active',
            'inactive'
        ],

        default: 'active'
    },

    // JOIN DATE
    joiningDate: {

        type: Date,

        default: Date.now
    }

});

/* ====================================
   EXPORT MODEL
==================================== */

module.exports = mongoose.model(
    'Trainer',
    trainerSchema
);
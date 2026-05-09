const mongoose = require('mongoose');

/* ====================================
   USER SCHEMA
==================================== */

const userSchema = new mongoose.Schema({

    // FIRST NAME

    firstName: {

        type: String,

        required: true,

        trim: true

    },

    // LAST NAME

    lastName: {

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

    // PHONE

    phone: {

        type: String,

        required: true

    },

    // AGE

    age: {

        type: Number,

        required: true

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

    // PASSWORD

    password: {

        type: String,

        required: true

    },

    // ROLE

    role: {

        type: String,

        enum: [

            'member',

            'admin'

        ],

        default: 'member'

    },

    // MEMBERSHIP

    membership: {

        type: String,

        enum: [

            'Basic',

            'Standard',

            'Premium'

        ],

        default: 'Basic'

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

    'User',

    userSchema

);
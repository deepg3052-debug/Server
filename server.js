// ====================================
// LOAD ENV VARIABLES
// ====================================

require('dotenv').config();

/* ====================================
   IMPORT PACKAGES
==================================== */

const express = require('express');

const cors = require('cors');

/* ====================================
   IMPORT DATABASE
==================================== */

const connectDB =
    require('./config/db');

/* ====================================
   IMPORT ROUTES
==================================== */

const authRoutes =
    require('./routes/authRoutes');

const bookingRoutes =
    require('./routes/bookingRoutes');

const membershipRoutes =
    require('./routes/membershipRoutes');

const paymentRoutes =
    require('./routes/paymentRoutes');

const trainerRoutes =
    require('./routes/trainerRoutes');

const userRoutes =
    require('./routes/userRoutes');

const membershipRequestRoutes =
    require(
        './routes/membershipRequestRoutes'
    );

/* ====================================
   IMPORT ERROR MIDDLEWARE
==================================== */

const {

    notFound,

    errorHandler

} = require(
    './middleware/errorMiddleware'
);

/* ====================================
   INITIALIZE EXPRESS APP
==================================== */

const app = express();

/* ====================================
   CONNECT DATABASE
==================================== */

connectDB();

/* ====================================
   MIDDLEWARE
==================================== */

// ENABLE CORS

app.use(cors());

// PARSE JSON DATA

app.use(express.json());

/* ====================================
   ROOT ROUTE
==================================== */

app.get('/', (req, res) => {

    res.send(
        'POWERFIT GYM SERVER RUNNING'
    );

});

/* ====================================
   API TEST ROUTE
==================================== */

app.get('/api/test', (req, res) => {

    res.status(200).json({

        success: true,

        message:
            'Backend API Working Successfully'

    });

});

/* ====================================
   API ROUTES
==================================== */

// AUTH ROUTES

app.use(
    '/api/auth',
    authRoutes
);

// USER ROUTES

app.use(
    '/api/users',
    userRoutes
);

// BOOKING ROUTES

app.use(
    '/api/bookings',
    bookingRoutes
);

// MEMBERSHIP ROUTES

app.use(
    '/api/memberships',
    membershipRoutes
);

// PAYMENT ROUTES

app.use(
    '/api/payments',
    paymentRoutes
);

// TRAINER ROUTES

app.use(
    '/api/trainers',
    trainerRoutes
);

// MEMBERSHIP REQUEST ROUTES

app.use(

    '/api/membership-requests',

    membershipRequestRoutes

);

/* ====================================
   ROUTE NOT FOUND
==================================== */

app.use(notFound);

/* ====================================
   GLOBAL ERROR HANDLER
==================================== */

app.use(errorHandler);

/* ====================================
   PORT
==================================== */

const PORT =
    process.env.PORT || 5000;

/* ====================================
   START SERVER
==================================== */

app.listen(PORT, () => {

    console.log(

        `Server running on port ${PORT}`

    );

});
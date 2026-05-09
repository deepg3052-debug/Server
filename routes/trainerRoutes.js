const express = require('express');

const router = express.Router();

/* ====================================
   IMPORT MIDDLEWARE
==================================== */

const {

    protect

} = require('../middleware/authMiddleware');

/* ====================================
   IMPORT CONTROLLERS
==================================== */

const {

    getTrainers,

    createTrainer,

    updateTrainer,

    deleteTrainer

} = require('../controllers/trainerController');

/* ====================================
   GET ALL TRAINERS
==================================== */

// PUBLIC ROUTE

router.get(

    '/',

    getTrainers

);

/* ====================================
   ADD TRAINER
==================================== */

// PROTECTED ROUTE

router.post(

    '/',

    protect,

    createTrainer

);

/* ====================================
   UPDATE TRAINER
==================================== */

router.put(

    '/:id',

    protect,

    updateTrainer

);

/* ====================================
   DELETE TRAINER
==================================== */

router.delete(

    '/:id',

    protect,

    deleteTrainer

);

/* ====================================
   EXPORT ROUTER
==================================== */

module.exports = router;

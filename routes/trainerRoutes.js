const express = require('express');

const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

/* ====================================
   IMPORT CONTROLLER
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

router.get('/', getTrainers);

/* ====================================
   ADD TRAINER
==================================== */

router.post('/', protect, createTrainer);

/* ====================================
   UPDATE TRAINER
==================================== */

router.put('/:id', protect, updateTrainer);

/* ====================================
   DELETE TRAINER
==================================== */

router.delete('/:id', protect, deleteTrainer);

/* ====================================
   EXPORT ROUTER
==================================== */

module.exports = router;
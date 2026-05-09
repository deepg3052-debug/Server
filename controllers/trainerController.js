const Trainer = require('../models/Trainer');

/* ====================================
   GET TRAINERS
==================================== */

const getTrainers = async (req, res) => {

    try {

        const trainers = await Trainer.find();

        res.status(200).json({

            success: true,

            data: trainers

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ====================================
   CREATE TRAINER
==================================== */

const createTrainer = async (req, res) => {

    try {

        const trainer = await Trainer.create(req.body);

        res.status(201).json({

            success: true,

            message: 'Trainer Added',

            data: trainer

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ====================================
   UPDATE TRAINER
==================================== */

const updateTrainer = async (req, res) => {

    try {

        const trainer = await Trainer.findByIdAndUpdate(

            req.params.id,

            req.body,

            { new: true }

        );

        res.status(200).json({

            success: true,

            message: 'Trainer Updated',

            data: trainer

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ====================================
   DELETE TRAINER
==================================== */

const deleteTrainer = async (req, res) => {

    try {

        await Trainer.findByIdAndDelete(req.params.id);

        res.status(200).json({

            success: true,

            message: 'Trainer Deleted'

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

    getTrainers,

    createTrainer,

    updateTrainer,

    deleteTrainer

};
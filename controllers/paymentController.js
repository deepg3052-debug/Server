const Payment = require('../models/Payment');

/* ====================================
   GET PAYMENTS
==================================== */

const getPayments = async (req, res) => {

    try {

        const payments = await Payment.find();

        res.status(200).json({

            success: true,

            data: payments

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ====================================
   CREATE PAYMENT
==================================== */

const createPayment = async (req, res) => {

    try {

        const payment = await Payment.create(req.body);

        res.status(201).json({

            success: true,

            message: 'Payment Added',

            data: payment

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ====================================
   UPDATE PAYMENT
==================================== */

const updatePayment = async (req, res) => {

    try {

        const payment = await Payment.findByIdAndUpdate(

            req.params.id,

            req.body,

            { new: true }

        );

        res.status(200).json({

            success: true,

            message: 'Payment Updated',

            data: payment

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ====================================
   DELETE PAYMENT
==================================== */

const deletePayment = async (req, res) => {

    try {

        await Payment.findByIdAndDelete(req.params.id);

        res.status(200).json({

            success: true,

            message: 'Payment Deleted'

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

    getPayments,

    createPayment,

    updatePayment,

    deletePayment

};
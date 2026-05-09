const Membership = require('../models/Membership');

/* ====================================
   GET MEMBERSHIPS
==================================== */

const getMemberships = async (req, res) => {

    try {

        const memberships = await Membership.find();

        res.status(200).json({

            success: true,

            data: memberships

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ====================================
   CREATE MEMBERSHIP
==================================== */

const createMembership = async (req, res) => {

    try {

        const membership = await Membership.create(req.body);

        res.status(201).json({

            success: true,

            message: 'Membership Added',

            data: membership

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ====================================
   UPDATE MEMBERSHIP
==================================== */

const updateMembership = async (req, res) => {

    try {

        const membership = await Membership.findByIdAndUpdate(

            req.params.id,

            req.body,

            { new: true }

        );

        res.status(200).json({

            success: true,

            message: 'Membership Updated',

            data: membership

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ====================================
   DELETE MEMBERSHIP
==================================== */

const deleteMembership = async (req, res) => {

    try {

        await Membership.findByIdAndDelete(req.params.id);

        res.status(200).json({

            success: true,

            message: 'Membership Deleted'

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

    getMemberships,

    createMembership,

    updateMembership,

    deleteMembership

};
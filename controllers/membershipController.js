const Membership = require('../models/Membership');

/* ====================================
   GET ALL MEMBERSHIPS
==================================== */

const getMemberships = async (req, res) => {

    try {

        const memberships = await Membership.find();

        res.status(200).json({

            success: true,

            count: memberships.length,

            data: memberships

        });

    } catch (error) {

        console.log(error);

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

        const {

            name,

            price,

            duration,

            features

        } = req.body;

        // VALIDATION

        if (

            !name ||

            !price ||

            !duration

        ) {

            return res.status(400).json({

                success: false,

                message: 'Please fill all required fields'

            });

        }

        // CREATE MEMBERSHIP

        const membership = await Membership.create({

            name,

            price,

            duration,

            features

        });

        res.status(201).json({

            success: true,

            message: 'Membership Added Successfully',

            data: membership

        });

    } catch (error) {

        console.log(error);

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

        const membership = await Membership.findById(

            req.params.id

        );

        // CHECK MEMBERSHIP

        if (!membership) {

            return res.status(404).json({

                success: false,

                message: 'Membership Not Found'

            });

        }

        // UPDATE MEMBERSHIP

        const updatedMembership =
            await Membership.findByIdAndUpdate(

                req.params.id,

                req.body,

                {

                    new: true,

                    runValidators: true

                }

            );

        res.status(200).json({

            success: true,

            message: 'Membership Updated Successfully',

            data: updatedMembership

        });

    } catch (error) {

        console.log(error);

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

        const membership = await Membership.findById(

            req.params.id

        );

        // CHECK MEMBERSHIP

        if (!membership) {

            return res.status(404).json({

                success: false,

                message: 'Membership Not Found'

            });

        }

        // DELETE MEMBERSHIP

        await Membership.findByIdAndDelete(

            req.params.id

        );

        res.status(200).json({

            success: true,

            message: 'Membership Deleted Successfully'

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ====================================
   EXPORT CONTROLLERS
==================================== */

module.exports = {

    getMemberships,

    createMembership,

    updateMembership,

    deleteMembership

};

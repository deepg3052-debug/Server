const MembershipRequest = require(
    '../models/MembershipRequest'
);

const User = require('../models/User');

/* ====================================
   CREATE MEMBERSHIP REQUEST
==================================== */

const createMembershipRequest =
    async (req, res) => {

        try {

            const {

                userId,

                userName,

                email,

                plan,

                price

            } = req.body;

            // VALIDATION

            if (

                !userId ||

                !userName ||

                !email ||

                !plan ||

                !price

            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        'Please fill all required fields'

                });

            }

            // CHECK EXISTING USER

            const user =
                await User.findById(userId);

            if (!user) {

                return res.status(404).json({

                    success: false,

                    message:
                        'User not found'

                });

            }

            // CHECK EXISTING PENDING REQUEST

            const existingRequest =
                await MembershipRequest.findOne({

                    userId,

                    status: 'pending'

                });

            if (existingRequest) {

                return res.status(400).json({

                    success: false,

                    message:
                        'You already have a pending membership request'

                });

            }

            // CREATE REQUEST

            const request =
                await MembershipRequest.create({

                    userId,

                    userName,

                    email,

                    plan,

                    price,

                    status: 'pending'

                });

            res.status(201).json({

                success: true,

                message:
                    'Membership request submitted successfully',

                data: request

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
   GET ALL MEMBERSHIP REQUESTS
==================================== */

const getMembershipRequests =
    async (req, res) => {

        try {

            const requests =
                await MembershipRequest.find()

                    .sort({

                        createdAt: -1

                    });

            res.status(200).json({

                success: true,

                count: requests.length,

                data: requests

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
   APPROVE MEMBERSHIP REQUEST
==================================== */

const approveMembershipRequest =
    async (req, res) => {

        try {

            const { paymentConfirmed } =
                req.body;

            // FIND REQUEST

            const request =
                await MembershipRequest.findById(

                    req.params.id

                );

            if (!request) {

                return res.status(404).json({

                    success: false,

                    message:
                        'Request not found'

                });

            }

            // ALREADY APPROVED

            if (
                request.status === 'approved'
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        'Request already approved'

                });

            }

            // PAYMENT VALIDATION

            if (!paymentConfirmed) {

                return res.status(400).json({

                    success: false,

                    message:
                        'Payment confirmation required'

                });

            }

            // UPDATE REQUEST

            request.status = 'approved';

            request.paymentConfirmed = true;

            request.approvedAt =
                new Date();

            await request.save();

            // UPDATE USER MEMBERSHIP

            const updatedUser =
                await User.findByIdAndUpdate(

                    request.userId,

                    {

                        membership:
                            request.plan,

                        status: 'active'

                    },

                    {

                        new: true

                    }

                );

            res.status(200).json({

                success: true,

                message:
                    `${updatedUser.firstName}'s membership upgraded successfully`,

                data: updatedUser

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
   REJECT MEMBERSHIP REQUEST
==================================== */

const rejectMembershipRequest =
    async (req, res) => {

        try {

            const { reason } = req.body;

            // FIND REQUEST

            const request =
                await MembershipRequest.findById(

                    req.params.id

                );

            if (!request) {

                return res.status(404).json({

                    success: false,

                    message:
                        'Request not found'

                });

            }

            // CHECK STATUS

            if (
                request.status === 'approved'
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        'Approved request cannot be rejected'

                });

            }

            // UPDATE REQUEST

            request.status = 'rejected';

            request.rejectionReason =
                reason || 'No reason provided';

            request.rejectedAt =
                new Date();

            await request.save();

            res.status(200).json({

                success: true,

                message:
                    'Membership request rejected successfully',

                data: request

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
   GET USER MEMBERSHIP
==================================== */

const getUserMembership =
    async (req, res) => {

        try {

            const userId =
                req.params.id;

            // FIND MEMBERSHIP

            const membership =
                await MembershipRequest.findOne({

                    userId,

                    status: 'approved'

                }).sort({

                    approvedAt: -1

                });

            if (!membership) {

                return res.status(404).json({

                    success: false,

                    message:
                        'No active membership found'

                });

            }

            res.status(200).json({

                success: true,

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
   EXPORT CONTROLLERS
==================================== */

module.exports = {

    createMembershipRequest,

    getMembershipRequests,

    approveMembershipRequest,

    rejectMembershipRequest,

    getUserMembership

};

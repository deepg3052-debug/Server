const MembershipRequest =
    require(
        '../models/MembershipRequest'
    );

const User =
    require('../models/User');

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

            // ====================================
            // CHECK EXISTING PENDING REQUEST
            // ====================================

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

            // ====================================
            // CREATE REQUEST
            // ====================================

            const request =
                await MembershipRequest.create({

                    userId,

                    userName,

                    email,

                    plan,

                    price

                });

            res.status(201).json({

                success: true,

                message:
                    'Membership request submitted successfully',

                data: request

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message: error.message

            });

        }

    };

/* ====================================
   GET ALL REQUESTS
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

                data: requests

            });

        } catch (error) {

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

            // ====================================
            // FIND REQUEST
            // ====================================

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

            // ====================================
            // ALREADY APPROVED
            // ====================================

            if (

                request.status ===
                'approved'

            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        'Request already approved'

                });

            }

            // ====================================
            // PAYMENT NOT CONFIRMED
            // ====================================

            if (!paymentConfirmed) {

                return res.status(400).json({

                    success: false,

                    message:
                        'Payment must be confirmed to approve'

                });

            }

            // ====================================
            // UPDATE REQUEST STATUS
            // ====================================

            request.status =
                'approved';

            request.approvedAt =
                new Date();

            request.paymentConfirmed =
                true;

            await request.save();

            // ====================================
            // UPDATE USER MEMBERSHIP
            // ====================================

            const updatedUser =
                await User.findByIdAndUpdate(

                    request.userId,

                    {

                        membership:
                            request.plan,

                        status:
                            'active'

                    },

                    {

                        new: true

                    }

                );

            res.status(200).json({

                success: true,

                message:
                    `${updatedUser.firstName}'s membership upgraded to ${request.plan}`,

                data: updatedUser

            });

        } catch (error) {

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

            // ====================================
            // FIND REQUEST
            // ====================================

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

            // ====================================
            // ALREADY APPROVED
            // ====================================

            if (

                request.status ===
                'approved'

            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        'Cannot reject an approved request'

                });

            }

            // ====================================
            // UPDATE REQUEST STATUS
            // ====================================

            request.status =
                'rejected';

            request.rejectionReason =
                reason || 'No reason provided';

            request.rejectedAt =
                new Date();

            await request.save();

            res.status(200).json({

                success: true,

                message:
                    'Membership request rejected',

                data: request

            });

        } catch (error) {

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

            const { userId } = req.params;

            // ====================================
            // FIND APPROVED MEMBERSHIP
            // ====================================

            const membership =
                await MembershipRequest.findOne({

                    userId,

                    status: 'approved'

                }).sort({

                    approvedAt: -1

                });

            if (!membership) {

                return res.status(200).json({

                    success: false,

                    data: null

                });

            }

            res.status(200).json({

                success: true,

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
   EXPORT
==================================== */

module.exports = {

    createMembershipRequest,

    getMembershipRequests,

    approveMembershipRequest,

    rejectMembershipRequest,

    getUserMembership

};
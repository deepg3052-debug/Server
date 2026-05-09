/* ====================================
   NOT FOUND MIDDLEWARE
==================================== */

const notFound = (req, res, next) => {

    const error = new Error(

        `Route Not Found - ${req.originalUrl}`

    );

    res.status(404);

    next(error);

};

/* ====================================
   GLOBAL ERROR HANDLER
==================================== */

const errorHandler = (

    err,
    req,
    res,
    next

) => {

    // ====================================
    // STATUS CODE
    // ====================================

    let statusCode =
        res.statusCode === 200
            ? 500
            : res.statusCode;

    // ====================================
    // RESPONSE
    // ====================================

    res.status(statusCode).json({

        success: false,

        message: err.message,

        stack:

            process.env.NODE_ENV === 'production'
                ? null
                : err.stack

    });

};

/* ====================================
   EXPORT MIDDLEWARE
==================================== */

module.exports = {

    notFound,

    errorHandler

};
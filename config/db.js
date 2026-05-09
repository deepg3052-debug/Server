const mongoose = require('mongoose');

/* ====================================
   CONNECT DATABASE FUNCTION
==================================== */

const connectDB = async () => {

    try {

        // ====================================
        // CONNECT MONGODB
        // ====================================

        const connection = await mongoose.connect(
            process.env.MONGO_URI
        );

        // ====================================
        // SUCCESS MESSAGE
        // ====================================

        console.log(
            `MongoDB Connected: ${connection.connection.host}`
        );

    } catch (error) {

        // ====================================
        // ERROR MESSAGE
        // ====================================

        console.error(
            `MongoDB Connection Error: ${error.message}`
        );

        // STOP SERVER
        process.exit(1);

    }

};

/* ====================================
   EXPORT FUNCTION
==================================== */

module.exports = connectDB;
const mongoose = require('mongoose');
require('dotenv').config({ path: 'vars.env' });

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('The DB is connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = dbConnect;
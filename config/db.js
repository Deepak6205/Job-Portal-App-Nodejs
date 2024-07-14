// const mongoose = require('mongoose');
import mongoose from 'mongoose';
import colors from 'colors'
//define mongoDb URL
const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL_LOCAL);
        console.log(`Connected To MongoDb Database ${mongoose.connection.host}`.bgMagenta.white)
    }catch(error){
        console.log(`MongoDB Error ${error}`.bgRed.white);
    }
};


// Export the database connection

export default connectDB;
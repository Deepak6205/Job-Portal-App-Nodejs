// packages imports
//const expres = require('express');
import colors from 'colors';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
//files imports
import connectDB from './config/db.js';
import testRoutes from './routes/testRoutes.js'
// config dotenv
dotenv.config();
//mongodb connection

connectDB();

//rest object
const app = express();


//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"))
//Routes
app.use('/api/v1/test', testRoutes);



// port
const PORT = process.env.PORT || 8080
//listne
app.listen(PORT, () =>{
    console.log(`Node server running in ${process.env.DEV_MODE} Mode on port no ${PORT}`.bgCyan.white);
});
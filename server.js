//imports
//const expres = require('express');
import colors from 'colors';
import expres from 'express';
import dotenv from 'dotenv';

// config dotenv
dotenv.config();

//rest object
const app = expres();

//Routes

app.get('/',(req,res)=>{
    res.send("<h1>Welcome to job my portal baby on port 8080</h1>")
});


// port
const PORT = process.env.PORT || 8080
//listne
app.listen(PORT, () =>{
    console.log(`Node server running in ${process.env.DEV_MODE} Mode on port no ${PORT}`.bgCyan.white);
});
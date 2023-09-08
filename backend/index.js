const express = require('express');
const cors = require("cors");
const { connection } = require('./connection/db');
const userRoutes = require('./routers/userRoutes'); 
const addressRoutes = require('./routers/addressRoutes');

const app = express();
app.use(express.json())
app.use(cors())

app.use('/users', userRoutes);
app.use('/addresses', addressRoutes);


app.listen(7000,async()=>{
    try{
        await connection
        console.log("Server Connected to the Mongoose");
    }catch(err){
        console.log(err);
    }
    console.log("Server is Running at 7000");
})

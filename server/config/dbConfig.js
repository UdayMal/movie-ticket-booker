// const mongoose = require('mongoose');

// const mongoURI = 'mongodb://localhost:27017/moviemania'; // Hardcoded URI for testing

// mongoose.set('strictQuery', false);

// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// const connection = mongoose.connection;

// connection.on('connected', () => {
//     console.log('MongoDB Connection Successful');
// });

// connection.on('error', (err) => {
//     console.log('MongoDB Connection Failed:', err);
// });
require('dotenv').config();

 const mongoose = require('mongoose');

 mongoose.connect("mongodb://localhost:27017/moviemania")

const connection = mongoose.connection;

connection.on('connected' , ()=>{
    console.log('Mongo DB Connetion Successfull');
})

connection.on('error' , (err)=>{
    console.log('Mongo DB Connetion Failed');
})


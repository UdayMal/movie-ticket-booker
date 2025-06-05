const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const dbConfig = require("./config/dbConfig");

const usersRoute = require("./routes/userRoute");
const moviesRoute = require("./routes/moviesRoute");
const theatresRoute = require("./routes/theatresRoute");
const paymentRoute = require('./routes/payment'); 
const bookingsRoute = require('./routes/bookingsRoute'); 

app.use(cors(origin: ["https://movie-ticket-booking-app-mu.vercel.app/login"]));
app.use(express.json());

app.use("/api/users", usersRoute);
app.use("/api/movies", moviesRoute);
app.use("/api/theatres", theatresRoute);
app.use('/api/payments', paymentRoute);
app.use('/api/bookings', bookingsRoute);

const port = process.env.PORT || 5000; 
app.listen(port, () => console.log(`Node JS Server is running on port ${port}`));

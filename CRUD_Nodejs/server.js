console.log('Server-side code running');

const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');
const dotenv = require('dotenv').config();

connectDB();

const app = express();
const port = process.env.PORT || 5000 ;

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler)

// serve files from the public directory
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    }
);
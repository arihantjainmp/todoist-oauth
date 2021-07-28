//Express server
const express = require('express');
const path = require('path');
const session = require('express-session')
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const authRoute = require('./routes/auth');
const syncRoute = require('./routes/sync');

app.use('/auth', authRoute);
app.use('/sync', syncRoute);


//Connect to DB
mongoose.set('useUnifiedTopology', true)
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => {
        console.log('Connected to MongoDB !');
    });


//ROUTES
app.get('/', (req,res) => {
    //res.send("We are on Home !");
    res.sendFile(path.join(__dirname, '/index.html'));
    });



app.listen(port);
console.log('Server started at http://localhost:' + port);






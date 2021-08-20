const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./server/database/connection');

const app = express();
dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080;

app.use(morgan('tiny'));

//database 

connectDB();

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))

// load routers

app.use('/',require('./server/routes/router'))

app.listen(PORT,()=>{
    console.log(`running on ${PORT}`);
})

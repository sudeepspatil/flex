const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const homeRouter = require('./routers/homeRouter')


const port  = process.env.port || 8080;

const app  = express();

// db con

mongoose.connect("mongodb+srv://sudeep:sudeep@cluster0.0azpr.mongodb.net/netflix?retryWrites=true&w=majority",{useNewUrlParser:true})
const db = mongoose.connection;

db.on("error",()=>{console.log("error in conection");})
db.once('open',()=>{console.log("Connected");})

app.set('view engine','ejs')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/', homeRouter)

app.get('/movies', (req,res)=>{
    res.render('movies')
})
app.get('/home', (req,res)=>{
    res.render('home')
})

app.get('/series', (req,res)=>{
    res.render('series')
})
app.get('/movie/:id', (req,res)=>{
    res.render('about')
})

app.get('/tv/:id', (req,res)=>{
    res.render('sabout')
})


app.listen(port)
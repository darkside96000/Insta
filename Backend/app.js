const express = require('express');
const {mongoUrl}=require('./key')
require("./models/Post")
const app = express()
const port = 5000;

const cors = require("cors");

app.use(cors())


require('./models/model')
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/cpost'))




const mongoose = require("mongoose");

mongoose.connect(mongoUrl);

mongoose.connection.on("connected", () => {
    console.log("successfully connected to mongo")
})

mongoose.connection.on("error", () => {
    console.log("not connected to mongodb")
})


app.listen(port, () => {
    console.log("server is running on port" + " " + port)

 })


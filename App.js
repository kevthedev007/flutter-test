const express = require('express');

//create express app
const app = express()

//custom module
const routes = require('./router/router.js');

//middleware
app.use(express.json())

//routing
app.use('/', routes)


app.listen(process.env.PORT || 3000, () => {
    console.log(`app started on ${process.env.PORT}`)
})
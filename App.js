const express = require('express');
const bodyParser = require('body-parser')

//create express app
const app = express()

//custom module
const routes = require('./router/router.js');

//middleware
// app.use((req, res, next) => {
//     if(req.headers['content-type'] !== 'application/json' && req.body !== "object") {
//         return res.json({
//             "message": "Invalid JSON payload passed.",
//             "status": "error",
//             "data": null
//         })
//     };
//     next()
// })

app.use(express.json())

//routing
app.use('/', routes)


app.listen(process.env.PORT || 3000, () => {
    console.log(`app started on ${process.env.PORT}`)
})
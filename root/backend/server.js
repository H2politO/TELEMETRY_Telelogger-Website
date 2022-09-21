const express = require('express');

//all the routes are located inside routes/runs file
const runRoutes = require('./routes/runs')

//express app
const app = express();

//middleware to log all the requests and where they come from
app.use((req, res, next) => {
    console.log(req.method, req.path)
    next()
})


//the first paramether is to use the runRoutes only when the route /api/runs is invoked
app.use('/api/allRuns', runRoutes) 


//listen to port number 3000
app.listen(3000, () => {
    console.log('listening on 3000!');
})



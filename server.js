const express = require('express');
const httpSerice = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors')
global.__base = __dirname + '/';



// wind up the app
const app = express();
const httpServer = httpSerice.createServer(app);
const router = express.Router();
 
// load the routes 
const routes = require('./app/router');

// set  all express Server settings 
app.set('port', process.env.PORT || 4000);
console.log("process.env.PORT", process.env.PORT);
app.set('host', '0.0.0.0');
// express middlewares
app.use(morgan('dev'));
app.use(bodyParser.json()); 
// remove the bodyParser.urlencoded middleware from API routes to make it safe , also if not using tradional html form
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
   "Access-Control-Allow-Headers",
   "Origin, X-Requested-With, Content-Type, Accept, Authorization"
   );
   res.setHeader("Access-Control-Allow-Methods",
    "GET,POST, PATCH, PUT, DELETE, OPTIONS")
  next();
});
 
// attach the routes 

// app.get('/', (req, res, next) =>{
//     res.status(200).json({
//         message : 'Welcome to Api Endpoint'
//     })
// });


app.use('/api',routes);

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//     const  err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// error handler functon
app.use((err , req, res, next) => {

    
    const error = app.get('env') ==='development' ? err : {};
    const status = err.status || 500;

    // respond to client
    res.status(status).json({
        error: {
                message: error.message
        }
    })

    // respond to ourself
    console.error(err);
});

// start listening to port

httpServer.listen(app.get('port'),app.get('host'),function(){
    console.log("Listening on " + app.get('port'));
});


app.use(cors());

module.exports = app;
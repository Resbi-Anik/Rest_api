const express = require("express");
const morgan = require('morgan')
const logger = require("./middleware/logger");
const config = require('config');
const courses= require('./routes/courses')
const home = require('./routes/home')
const Joi = require("joi");
const cons = require("consolidate")

const app = express();

console.log(`env: ${process.env.NODE_ENV}` );
console.log(`auto env get: ${app.get('env')}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use("/api/courses", courses)
app.use("/", home)

app.use(logger);

//config 
console.log(`server type: ${config.get('name')}`); 
console.log(`mail type: ${config.get('mail.host')}`);
console.log(`app password: ${config.get('password')}`);

//template engine
app.engine('html', cons.mustache);

app.set("view engine", "html")

app.set('views', './views');

if(app.get('env')==="development"){
  app.use(morgan('tiny'))
  console.log('morgan enable');
}

app.use((req, res, next) => {
  console.log("next()");
  next();
});


const port = process.env.PORT || 3000;
console.log("port", port);

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});

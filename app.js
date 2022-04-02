const express = require("express");

require('dotenv').config()

var morgan = require('morgan')
const cors = require('cors')

const bodyParser = require('body-parser')

const UserRouter = require('./Routes/user')
const AdminRouter = require('./Routes/admin')
const db = require('./config/connection');

const app = express()

const PORT = process.env.PORT || 3000


app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());


app.use('/api/v1/user', UserRouter);
app.use('/api/v1/admin/', AdminRouter);

app.use(morgan('tiny'))

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("db connected");
  }
})




 app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server started at ", PORT);
  }
})


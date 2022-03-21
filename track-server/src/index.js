require('./models/User');
require("./models/Track");
const express = require('express');
const mongoose = require('mongoose'); // Used to connect to mongo db
const bodyParser = require('body-parser'); // To use the json data type (application/json - Content-type)
const authRoutes = require('./routes/authRoutes'); // used to execute the post requests
const trackRoutes = require('./routes/trackRoutes')
const requireAuth = require('./middlewares/requireAuth') // Used to see if the user is connected

const app = express();

app.use(bodyParser.json())
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb+srv://root:adminuser@cluster0.qvmwr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    // useCreateIndex: true, Not supported error
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log("Connected to mongo instance");
})

mongoose.connection.on('error', (err) => {
    console.error("Error ocurred: ", err);
})

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email is ${req.user.email}`);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
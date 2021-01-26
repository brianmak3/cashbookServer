const express = require('express'),
    path = require('path'),
    app = express(),
    http = require('http').Server(app),
    person = { Name: 'amos', Age: 24, city: 'kisii' },
    port = process.env.port || 3000,
    bodyParser = require('body-parser'),
    Modules = require('./src'),
    cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/',express.static(path.join(__dirname, 'images')));
app.get('/', (req, res) => {
    res.send('Welcome to cashbook')
})
app.post('/', (req, res) => {
    const data = req.body,
        { module } = data;
    Modules[module](data, res);
})
mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cashbook', { useUnifiedTopology: true, useNewUrlParser: true })
http.listen(port, () => console.log('App listenting on port ' + port))

const express = require('express');
const app = express();
const logger = require('morgan');
const reload = require('reload');
const http = require('http');

const bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/bower_components"));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

var port = process.env.PORT;

app.set('port', port);

// app.listen(port, function() {
//   console.log('listening on ' + port);
// });

var jsonData = [
    {
        "Name": "Ian Bonnycastle",
        "Age": "45",
        "Sex": "Male"
    },
    {
        "Name": "Wanda Bonnycastle",
        "Age": "47",
        "Sex": "Female"
    },
    {
        "Name": "Aidan Bonnycastle",
        "Age": "9",
        "Sex": "Male"
    },
    {
        "Name": "Darren Robinson",
        "Age": "21",
        "Sex": "Male"
    }
];

app.get('/people', (req, res) => {
    res.send(jsonData); 
});

// We're getting sent one-based indexes
app.get('/people/:id', (req, res) => {
    // Artificially set an ID based on the array index.
    
    var tmp = jsonData[req.params.id-1];
    
    tmp.id = req.params.id-1;
    
    res.send(tmp);
});

app.post('/people/:id', (req, res) => {
    var id = req.params.id;

    console.log('Here2: ' + JSON.stringify(req.body));    
    
    // Strip out the artificial ID.
    delete req.body.id;
    
    jsonData[id] = req.body;
    
    console.log("Saved.");
});

// This is a duplicate, as originally not having an ID caused this function to fire.
app.post('/people', (req, res) => {
    console.log("Here: " + JSON.stringify(req.body));
    
    var id = req.body.id;
    
    delete req.body.id;
    
    jsonData[id] = req.body;
    
    console.log("Saved.");
});

app.post('/quotes', (req, res) => {
    console.log(req.body);
});

var server = http.createServer(app);

// Reload code here 
reload(server, app);
 
server.listen(app.get('port'), function(){
    console.log("Web server listening on port " + app.get('port'));
});
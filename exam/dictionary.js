var express = require('express');
var app = express();
const bodyParser= require('body-parser')
const port = 3000;
var loggedin = false;

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://bonk:777@cluster0.qnnx8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:true}));

var bookinventory = [];

app.get('/', function(req, res){
  var html = '<br><a href="/register" class="btn">Register</a><br><a href="/login" class="btn">Login</a>';
  res.send("Welcome to your Merriam-Webster Dictionary database!<br>" + html);
});

app.get('/register', (req, res) => {
  var html = '<p>Sign Up for free dictionary service!</p><br><form action="/register" method="post"><label for="uname">Username:</label><br><input type="text" id="uname" name="uname"><label for="pword"><br>Password:</label><br><input type="text" id="pword" name="pword"> <input type="submit" value="Submit"><br></form>';
  res.send(html + '<br><a href="/">Home</a>');
});

app.get('/login', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var html = '<p>Login to your account</p><br><form action="/login" method="post"><label for="uname">Enter your username:</label><br><input type="text" id="uname" name="uname"><label for="pword"><br>Enter your password:</label><br><input type="text" id="pword" name="pword"> <input type="submit" value="Submit"><br></form>';
    res.send(html + '<br><a href="/">Home</a>');
  });
});

app.get('/main', (req, res) => {
  if(loggedin == true){
    res.sendFile(__dirname + '/public/dictioexam.html');
  }else{
    var html = '<a href="/login">Please log in.</a>';
    res.send(html);
  }
});

app.post('/press', (req, res) => {
  console.log('pressed');
});

app.post('/login', function(req, res){
  console.log(req.body);
  var userlog = req.body.uname;
  var passlog = req.body.pword;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var query = { username : userlog, password : passlog };
    var db = db.db("wserv");
    db.collection("users").find(query).toArray(function(err,result) {
      if(result.length !== 0) {
        var name = result[0].username
        loggedin = true;
        res.redirect('/main');
     } else {
        res.send('Wrong login information. Try again.<br><a href="/">Home</a>');
     }
    });
  });
})

app.post('/register', function(req, res){
  console.log(req.body);
  var newuser = req.body.uname;
  var newpass = req.body.pword;
  var newjson = {'username': newuser, 'password' : newpass};
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var db = db.db("wserv");
    db.collection("users").insertOne(newjson, function(err, res) {
      if (err) throw err;
    });
  });
  res.send('Your account ' + newuser + ' is added! <br><a href="/">Home</a>');
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
})
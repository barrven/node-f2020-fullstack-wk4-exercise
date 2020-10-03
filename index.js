const express = require('express');
const app = express();
const router = express.Router();
const path = require('path')
/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/

app.use(express.static('public'))

app.get('/', (req,res) => {
  res.sendFile(__dirname+'/home.html');
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res) => {
  res.sendFile(__dirname+'/user.json');
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send resonse as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send resonse as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login', (req,res) => {
  let response = {}
  let username = req.query.username;
  let pw = req.query.password;
  let user = require('./user.json')

  if(username === user.username && pw === user.password){
    response = {
      status: true,
      message: "User Is valid"
    }
  }
  else if(username !== user.username){
    response = {
      status: false,
      message: "User Name is invalid"
    }
  }
  else if(pw !== user.password){
    response = {
      status: false,
      message: "Password is invalid"
    }
  }

  res.send(response);
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req,res) => {
  res.send(`<h1>User "${req.params.username}" successfully logged out.</h1>`);
});

app.use('/', router);
app.listen(process.env.port || 8081);
console.log('Web Server is listening at port '+ (process.env.port || 8081));
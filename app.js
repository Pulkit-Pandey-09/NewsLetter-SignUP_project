const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");
const https = require('https');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  var data = {
    members: [
      {
      email_address: email,
      status: 'subscribed',
      merge_fields : {
        FNAME : firstName,
        LNAME : lastName
      }
    }
  ]
  }
  const jsonData = JSON.stringify(data);

  const url = "https://us2.api.mailchimp.com/3.0/lists/9d8b797504";
  const option = {
    method : "POST",
    auth : "pulkit09:582aa4e1019780e73aa91c12af4152a2-us2"
  }
  const request = https.request(url, option, function(response) {

    if(response.statusCode == 200)
    {
      res.sendFile(__dirname + "/success.html")
    }
    else{
      res.sendFile(__dirname + "/failure.html")
    }
    response.on("data", function(data) {
      //console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req,res){
  res.redirect('/');
})

app.listen(process.env.PORT || 3000, function(req, res) {
  console.log("server running");
})

// 582aa4e1019780e73aa91c12af4152a2-us2

// 9d8b797504

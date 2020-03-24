const express = require("express");

const bodyParser =  require("body-parser");

const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req,res){
res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req,res){
  const fristName = req.body.fristName;
  const lastName  =  req.body.lastName;
  const email     =  req.body.email;
  console.log("Name is "+fristName+" "+lastName);
  console.log("Email is : "+email);

  const data = {
        members: [
          {
            email_address : email,
            status         : "subscribed",
            merge_fields: {
              FNAME : fristName,
              LNAME : lastName
            }
          }
        ]
  };
const jsonData = JSON.stringify(data);

const url =  "https://us19.api.mailchimp.com/3.0/lists/840a33663e";
const options = {
    method : "POST",
    auth : "Deepak:e1190dd45b986b80f6a4642ab87ff211-us19"
}

const request = https.request(url, options ,function(response){
  var status = response.statusCode;
if(status === 200){
  res.sendFile(__dirname+"/success.html");
}
else{
  res.sendFile(__dirname+"/failure.html");
}

  response.on("data", function(data){
    console.log(JSON.parse(data));
  })
});
request.write(jsonData);
request.end();


});

app.post("/failure", function(req,res){
  res.redirect("/");
});




app.listen(process.env.PORT || 3000, function(req,res){
  console.log("I am 3000.");
});

// api key
//e1190dd45b986b80f6a4642ab87ff211-us19
// list  ID
// 840a33663e

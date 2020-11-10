const express = require("express");
const https = require("https");



const app = express();

app.get("/",function(req,res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=chicago&appid=bb4c62c3ea90ebc7542c97aa1f12fc94&units=imperial"
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
           const weatherData = JSON.parse(data);
           const temp = weatherData.main.temp;
           const weatherDesc = weatherData.weather[0].description;
           const icon = weatherData.weather[0].icon;
           const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
           res.write("<p> The weather is " + weatherDesc + "</p>");
           res.write("<h1> The temperature in Chicago is " + temp + " degrees</h1>");
           res.write("<img src=" + imageURL +">");
           res.send();
        });
    });
    // res.send("Server is running.");
});




app.listen(3000, function(){
    console.log("Server running on port 3000.");
});
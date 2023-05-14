const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { log } = require("console");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/index.html", function (req, res) {
    const query = req.body.cityName;
    const appKey = "8526bfdc3f6dbae00fd275117a14eb52";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&APPID=" + appKey + "&units=" + unit;

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            console.log(icon);
            console.log(weatherDescription);
            console.log(temp);
            res.write("<h1 style='font-size: 2.5rem;text-align: center;margin-top: 2rem;'>The Temperature In " + query + " is " + temp + " Degree Celsius </h1>");
        res.write("<p style='text-align: center'>The Weather description is Currently " + weatherDescription + ".</p>");
        res.write("<img style='position: relative;left: 49%;' src = " + imageURL + "></img>");
        res.send();
    })

});
});



app.listen(3000, function () {
    console.log("server is running on port 3000");
});
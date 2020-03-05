const express = require("express");
const app = express();
const fs = require("fs");
const port = process.env.PORT || 3000;

// read json file to get game data
const gameData = JSON.parse(fs.readFileSync("./games.json", "utf-8", function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
}));


app.get("/", function(req, res){
    res.send("Hello!");
});

app.get("/search", function(req, res){
    let searchText = req.query.query.toLowerCase();
    let index = req.query.index;
    
    // search games that contain the saerch text and sort by rating
    var result = gameData.filter(game => game.title.toLowerCase().search(searchText) !== -1);
    result.sort((a,b) => (a.rating > b.rating) ? 1: -1);
    // additional 10 more from given index
    output = result.slice(index, index + 10);
    res.send(output);
});


app.listen(port, function(){
    console.log("Now serving the app on port: " + port);
});

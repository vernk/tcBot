/*
Non-modular version
*/

var Discord = require("discord.js");
var http = require('https');
var bot = new Discord.Client();
bot.loginWithToken("MjIwMjkyODAyOTI2MzQ2MjQx.CqeLOg.gPDuK4Yybbu0WVT7IH208ZT3egc");

//Bot ready listener
bot.on("ready", function() {
    console.log("TechCrunch Bot is now online");
    setInterval(function() {
        var fs = require("fs");
        var url = 'https://newsapi.org/v1/articles?source=techcrunch&sortBy=latest&apiKey=c4794fcbc9fe4d8195157c4337562326';

        http.get(url, function(res) {
            var body = '';
            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function() {
                var parsedJSON = JSON.parse(body);


                if (parsedJSON.articles[0].publishedAt !== getLatestEntryDate()) {
                    console.log("Changes detected - downloading (Current:" + parsedJSON.articles[0].publishedAt + " | Local: " + getLatestEntryDate());
                    var urls = [];
                    var data = parsedJSON.articles;
                    for (var i in data) {
                        if (data[i].publishedAt > getLatestEntryDate()) {
                            var url = data[i].url;
                            var title = data[i].title;
                            var date = data[i].publishedAt;
                            bot.sendMessage(bot.channels.get('name', 'tech-news'), '**' + title + '**```' + url + '```');
                            urls.push(url);

                        }
                    }
                    console.log(urls);


                    fs.writeFile("./local/data.json", JSON.stringify(parsedJSON), "utf8", function(err) {
                        if (err) return console.log(err);

                    });
                    return urls;

                } else {
                    console.log("No changes detected - not downloading (Current:" + parsedJSON.articles[0].publishedAt + " | Local: " + getLatestEntryDate());
                }
                return;
            });
        }).on('error', function(e) {
            console.log("Got an error: ", e);
        });


    }, 60000);
});

function getLatestEntryDate() {
    var fs = require("fs");
    return JSON.parse(fs.readFileSync('./local/data.json', {
        encoding: 'utf8'
    })).articles[0].publishedAt;
}

//Bot on recieving message listener
bot.on("message", function(message) {
    /*
    @Command ping
    @Returns pong
    */
    if (message.content === "ping") {
        bot.reply(message, "pong");
    }
    if (message.content === "@tccheck") {
        plug.checkArticles();
    }
    if (message.content === "@tcinit") {

        bot.reply(message, "TechCrunch Bot has been initialized")
    }
});
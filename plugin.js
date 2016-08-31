var http = require("https");
 var Discord = require("discord.js");
var bot = new Discord.Client();
 
function getLatestEntryDate() { 
    var fs = require("fs");
return JSON.parse(fs.readFileSync('./local/data.json', { encoding: 'utf8' })).articles[0].publishedAt;
}

function getCurrentData() { 
   
}
module.exports = {
  checkArticles: function() {
    
  }
       
};
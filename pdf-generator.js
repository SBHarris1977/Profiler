const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const pdf = require("html-pdf");
var html = fs.readFileSync('./index.html', 'utf8'); 
var options = {format: 'Letter'}



inquirer
.prompt([
    {
        message: "What is your first and last name?",
        name: "name"
    
    },

    {
message: "Enter your github username",
    name: "username"
    
},

{
    message: "What's your fave color?",
    name: "color"
}
])
.then(function({name, username, color}){
    const queryURL = `https://api.github.com/users/${username}`;

    axios
    .get(queryURL)
    .then(function(res){
        // console.log(res.data);
        var avatar_url = res.data.avatar_url;
        var url = res.data.html_url;
        var repo = res.data.public_repos;
        var followers = res.data.followers;
        var following = res.data.following;
        var location = res.data.location;
    
    fs.writeFile("index.html", `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body style="background: ${color};">
        <img src="${avatar_url}">
        <h1>
        <a href="${url}">github</a>
        </h1>
        <h2>Name: ${name}</h2>
        <p>Number of Repos: ${repo}</p>
        <p>Number of Followers: ${followers}</p>
        <p>Number Following: ${following}</p>
        <p>Location: ${location}</p>
    </body>
    </html>`, function(err){
        if (err){
            throw err;
        }
    })
    
     
    
     });
})
.then(function(){
    pdf.create(html, options).toFile('./index.pdf', function(err, data){
         if (err) {
             throw err;
         }
         console.log(data);
     }); 
})
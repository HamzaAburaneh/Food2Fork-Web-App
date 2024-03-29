/*
NOTE: You need to intall the npm modules by executing >npm install
before running this server
*/
const express = require('express') //express framework
const requestModule = require('request') //npm module for easy http requests
const PORT = process.env.PORT || 3000

// YOU NEED AN APP ID KEY TO RUN THIS CODE

const FOOD2FORK_API_KEY = '08b4ef60dec92dadac663d11375b3458' //PUT IN YOUR OWN KEY HERE

const app = express()

//Middleware
app.use(express.static(__dirname + '/public')) //static server

//Routes
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})
app.get('/recipes', (request, response) => {
  let ingredients = request.query.ingredients
  if(!ingredients) {
    return response.json({message: 'Please enter a recipe name'})
  }

requestModule.get({
    url: "http://food2fork.com/api/search",
    qs: {
        key: FOOD2FORK_API_KEY,
        q: ingredients
    },
    json:true
}, (err, res, data) => {
    return response.json(data); // Already parsed as JSON
})})
//start server
app.listen(PORT, err => {
  if(err) console.log(err)
  else {
    console.log(`Server listening on port: ${PORT}`)
  }
})

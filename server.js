//Express
const express = require("express");
//Start up 
const app = express();
//CORS 
const cors = require("cors");
//CORS Requests
app.use(cors());
//body-parser
const bodyParser = require("body-parser");
// 
app.use(bodyParser.urlencoded({ extended: false }));
// 
app.use(bodyParser.json());
//Setup 
projectData = {};
//Initialize 
app.use(express.static("website"));
// GET 
const getAll = (req, res) => res.status(200).send(projectData);
// GET Route
app.get("/all", getAll);
// POST
const postData = (req, res) => {
    projectData = req.body;
    console.log(projectData);
    res.status(200).send(projectData);
  }
// GET Route
app.post("/add", postData);
const port = 6000;
const hostname = "127.0.0.1";
// function to test the server 
const listening = () =>
console.log(`Server running at http://${hostname}:${port}/`);
// spin up the server
app.listen(port, listening);

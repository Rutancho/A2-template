/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Jaehyuk Heo Student ID: 105421234 Date: 2024-01-31
*
********************************************************************************/



const express = require('express');
const legoData = require('./modules/legoSets');
const path = require('path');

const app =express();

const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
  });
  

  app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
  });

  app.get("/lego/sets", async (req, res) => {
    try {
      console.log("첫번")
      let sets = req.query.theme ? await legoData.getSetsByTheme(req.query.theme) : await legoData.getAllSets();
      console.log("두번")
      res.send(sets);
    } catch (err) {
      console.log("삼번")
      res.status(404).send('Unable to find requested sets');
    }
  });


app.get("/lego/sets/:num", async (req, res) => {
    try {
      console.log("사번")
      let set = await legoData.getSetByNum(req.params.num);
      console.log("6번")
      res.send(set);
    } catch (err) {
      console.log("7번")
      res.status(404).send('Set not found');
      console.log("9번")
    }
  });
  

  app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
  });
  
  legoData.initialize().then(() => {
    app.listen(HTTP_PORT, () => console.log(`Server listening on: ${HTTP_PORT}`));
  });
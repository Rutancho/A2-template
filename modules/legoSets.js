/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Jaehyuk Heo Student ID: 105421234 Date: 2024-02-15
*
*  Published URL: https://odd-gold-donkey-tutu.cyclic.app

*
********************************************************************************/


const setData = require("../data/setData");
const themeData = require("../data/themeData");

let sets = [];

function initialize() {
  return new Promise((resolve, reject) => {
    setData.forEach(setElement => {
      const theme = themeData.find(themeElement => themeElement.id == setElement.theme_id);
      if (theme) {
        let setWithTheme = { ...setElement, theme: theme.name };
        sets.push(setWithTheme);
      } 
      else 
      {
      reject(new Error("Theme not found for set: " + setElement.id));
      }
    });
    resolve();
  });
}

function getAllSets() {
  return new Promise((resolve, reject) => {
    resolve(sets);
  });
}

function getSetByNum(setNum) {

  return new Promise((resolve, reject) => {
    let foundSet = sets.find(s => s.set_num == setNum);

    if (foundSet) {
      resolve(foundSet)
    } else {
      reject("Unable to find requested set");
    }

  });

}

function getSetsByTheme(theme) {

  return new Promise((resolve, reject) => {
    let foundSets = sets.filter(s => s.theme.toUpperCase().includes(theme.toUpperCase()));

    if (foundSets.length > 0) {
      resolve(foundSets)
    } else {
      reject("Unable to find requested sets");
    }

  });

}

module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme }
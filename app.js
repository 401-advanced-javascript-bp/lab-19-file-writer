"use strict";

const Q = require('@nmq/q/client');

const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


const alterFile = file => {
  readFile(file)
    .then((data) => {
      let text = data.toString().toUpperCase();
      return writeFile(file, text)
        .then(() => {
          // console.log('wrote the file');
          Q.publish('filesQueue', 'save', 'It worked!');
        }
        );
    })
    .catch(err => {
      Q.publish('filesQueue', 'error', 'This is an error.');
    })
};

let file = process.argv.slice(2).shift();
alterFile(file);

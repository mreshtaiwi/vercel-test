"use strict";
const server = require("./src/server.js");
// server.start(3000); //or you can add the port to the .env file

// like PORT=3000
//if you gonna use .env you need to require it and then use it otherwise it will not work so be careful
require("dotenv").config(); //this line must be before using process.env.PORT or that will cause a problem so put it at the top level of the file

let PORT = process.env.PORT || 3000;

server.start(PORT);
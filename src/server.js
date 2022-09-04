"use strict"; // to use javascript in strict mode

const express = require("express");
const app = express();
const notFoundHandler = require("./handlers/404");
const errorHandler = require("./handlers/500");

//this is how we handle routes inside the server
app.get("/", (req, res) => {
    res.send("Hello From Home Route");
});
app.post("/bad", (req, res) => {
    let num = 10;
    num.forEach((x) => {
        console.log(x);
    });
    res.send("this is an error inside the server");
});
app.get("/data", (req, res) => {
    res.json({
        id: 1,
        name: "test student",
        email: "test@test.com",
    });
});

// middlewares stamper
// without module

// app.get("/test", stamper, (req, res) => {
//     res.json({
//         id: 2,
//         name: "test2 student",
//         email: "test2@test.com",
//         time: req.timestamp,
//     });
// });

// function stamper(req, res, next) {
//     req.timestamp = new Date();
//     next();
// }

// with module
// we need to require it 
const stamper = require('./middlewares/stamper.js');

app.get('/test', stamper, (req, res) => {

    //this is a way of sending the object 
    const outputObject = {
        id: 2,
        name: "test2 student",
        email: "test2@test.com",
        time: req.timestamp // we got this from the middleware
    };
    res.status(200).json(outputObject);
});
//it should be at the end after all routes
app.use("*", notFoundHandler);

app.use(errorHandler); //it should be the last one after the *
// so if i want others to access my file i can do that easily using module like we can export anything number or [] or {} but usually we do exports {}'s
function start(port) {
    app.listen(port, () => {
        console.log(`Listen and Running on port ${port}`);
    });
}

module.exports = {
    app: app,
    start: start,
};
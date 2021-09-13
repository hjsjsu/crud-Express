var express = require('express');
const fs = require('fs');
// var bodyParser = require('body-parser');
// 第一版提交

var router = require('./router');

var app = express();


app.engine('html', require('express-art-template'));

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(router)

app.listen(4000, function() {
    console.log('running 4000...');
})
module.exports = app;
// console.log(router);

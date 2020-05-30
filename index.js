var express = require("express");
var app = express();

const mysql = require('mysql');

const con = mysql.createConnection({
    host: "clouddb",
    port: "3306",
    user: process.env.DB_USER,
    password: process.env.DB_PASS
});

//host: 127.0.0.1

app.get('/', (req, res) => {
    res.send("Ratings Service");
});

app.get('/recommendations', (req, res) => {
    var userId = req.query.userid;
    if (userId!==null) {
        con.connect(function(err) {
            con.query(`SELECT * FROM test.recommendations, test.movies WHERE test.recommendations.userId = '` + userId + `' AND test.movies.id = test.recommendations.movieId`, function(err, result, fields) {
                if (err) res.send(err);
                if (result) res.send(result);
            });    
        });
    } else {
        res.status(500).json({"error":"Something went wrong. Check your input."});
    }
});

app.listen(8080, () => {
    console.log("Server running on port 8080");
});

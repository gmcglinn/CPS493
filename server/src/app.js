console.log("api is running")
const express = require('express')
const cors = require('cors')
const app = express()



const mysql = require('mysql')
require('dotenv').config()
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB
})


connection.connect()


module.exports = connection;

app.use(express.json());
app.use(cors())

app.post('/register', (req, res) => {   
    connection.query(`INSERT INTO UserProfile (EmailAddress, Password, Username)
    VALUES ('${req.body.email}', '${req.body.password}', '${req.body.username}')`, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
});
})

app.post('/login', (req, res) => {
    connection.query(`SELECT UserID, Username, Administrator FROM UserProfile WHERE Username = '${req.body.username}' AND Password='${req.body.password}'`, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
    });
})

app.get('/getLatest', (req, res) => {
    connection.query(`SELECT PostID FROM Post ORDER BY CreatedTime DESC LIMIT 10`, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
    });
})

app.post('/getPost', (req, res) => {
    connection.query(`SELECT * FROM Post WHERE PostID = '${req.body.ID}'`, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
    });
})
app.post('/getUser', (req, res) => {
    connection.query(`SELECT * FROM UserProfile WHERE UserID = '${req.body.UserID}'`, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
    });
})
app.post('/getPostCreator', (req, res) => {
    connection.query(`SELECT Username FROM UserProfile WHERE UserID = '${req.body.ID}'`, function (error, results, fields) {
    if (error) throw error;
    res.send(results)
    });
})


app.listen(process.env.PORT || 8081)
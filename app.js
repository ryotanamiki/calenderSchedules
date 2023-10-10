const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

const mysql = require('mysql2');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'calenderSchedule'
});

// cssファイルの取得
app.use(express.static('assets'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const sql = "SELECT * from schedules;";
    con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.render("index", {
        schedule: result
    });
    });
});

// スケジュールの追加
app.get("/create/:date", (req, res) => {
    res.sendFile(path.join(__dirname, "html/form.html"));
});

app.post("/", (req, res) => {
    console.log(req.params.id);
    const sql = "INSERT INTO schedules (id, date, title, user, content) VALUES (?, ?, ?, ?, ?)"
    con.query(
    sql,
    [
    req.body.id,
    req.body.date,
    req.body.title,
    req.body.user,
    req.body.content
    ],
    function (err, result, fields) {
        if (err) throw err;
    }
    );
});

// スケジュールの表示
app.get("/show/:id", (req, res) => {
  const sql = `SELECT * FROM schedules WHERE id = ${req.params.id}`;
    con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.render("show", {
        schedule: result,
    });
    });
});

// スケジュール編集
app.get("/edit/:id", (req, res) => {
  const sql = `SELECT * FROM schedules WHERE id = ${req.params.id}`;
    con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.render("edit", {
        schedule: result,
    });
    });
});

app.post("/update/:id", (req, res) => {
    console.log(req.params.id);
    const sql = "UPDATE schedules SET ? WHERE id = " + req.params.id;
    con.query(sql, req.body, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    });
});

// スケジュール削除
app.get("/delete/:id", (req, res) => {
    const sql = "DELETE FROM schedules WHERE id = ?";
    con.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send("スケジュールを削除しました");
    });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

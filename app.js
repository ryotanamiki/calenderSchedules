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

// 今月のカレンダーを表示するルート
app.get('/', (req, res) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

    res.render('index', {
        currentYear,
        currentMonth,
        daysInMonth,
    });
});

// 任意の月のカレンダーを表示するルート
app.get('/calendar/:year/:month', (req, res) => {
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);
    const daysInMonth = new Date(year, month, 0).getDate();

    res.render('index', {
        currentYear: year,
        currentMonth: month,
        daysInMonth,
    });
});

app.post('/schedule', (req, res) => {
    const year = req.body.year;
    const month = req.body.month;
    const day = req.body.day;
    const title = req.body.title;
    const author = req.body.author;
    const schedule = req.body.schedule;

  // MySQLにデータを格納するクエリを実行
    const insertQuery = `
    INSERT INTO schedule (year, month, day, title, author, schedule)
    VALUES (?, ?, ?, ?, ?, ?)
    `;

    con.query(insertQuery, [year, month, day, title, author, schedule], (err, results) => {
        if (err) {
        console.error('データベースエラー:', err);
        res.status(500).send('データベースエラーが発生しました。');
        } else {
            res.redirect('/');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
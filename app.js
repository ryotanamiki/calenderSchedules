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

// 今月のカレンダーを表示
app.get('/', (req, res) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

    res.render('index', {
        currentYear,
        currentMonth,
        daysInMonth,
        date: `${currentYear}-${currentMonth}-01`,
    });
});

// 任意の月のカレンダーを表示
app.get('/calendar/:year/:month', (req, res) => {
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);
    const daysInMonth = new Date(year, month, 0).getDate();

    res.render('index', {
        currentYear: year,
        currentMonth: month,
        daysInMonth,
        date: `${year}-${month}-01`,
    });
});

// スケジュールを表示
app.get('/getSchedule', (req, res) => {
    const date = req.query.date;
    const sql = 'SELECT * FROM schedules WHERE date = ?';

    con.query(sql, [date], (err, results) => {
        if (err) {
            console.error('予定の取得中にエラーが発生しました:', err);
            res.status(500).send('予定の取得中にエラーが発生しました。');
            return;
        }
        const schedules = results;

        res.render('schedule', {
            date,
            schedules,
        });
    });
});

// スケジュールを保存
app.post('/addSchedule', (req, res) => {
    const { date, name, user, content } = req.body;

    const sql = 'INSERT INTO schedules (date, name, user, content) VALUES (?, ?, ?, ?)';

    con.query(sql, [date, name, user, content], (err, result) => {
        if (err) {
            console.error('予定の追加中にエラーが発生しました:', err);
            res.status(500).send('予定の追加中にエラーが発生しました。');
            return;
        }

        console.log('予定が追加されました。');
        res.send('スケジュールが追加されました。');
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

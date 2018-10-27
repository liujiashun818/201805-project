let mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    username: 'root',
    pwd: 'root',
    database: 'school'
});
connection.connect();
connection.beginTransaction(function (err) {
    connection.query(`UPDATE account SET balance = balance - 50 WHERE name = '张三'`, (err) => {
        if (err) {
            connection.rollback();
        } else {
            connection.query(`UPDATE account1 SET balance = balance + 50 WHERE name = 3'李四'`, (err) => {
                if (err) {
                    console.log(err);
                    connection.commit();
                    //connection.rollback();
                } else {
                    connection.commit();
                }
            })
        }
    })
});


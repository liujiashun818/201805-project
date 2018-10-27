let mysql = require('mysql');
let Promise = require('bluebird');
let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: '2018crawl',
    user: 'root',
    password: 'root'
});
connection.connect();
module.exports = {
    query: Promise.promisify(connection.query).bind(connection)
}
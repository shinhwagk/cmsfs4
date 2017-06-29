"use strict";

const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
    host: 'mysql.cmsfs.org',
    user: 'root',
    password: '123456aA+',
    database: 'cmsfs'
});

function queryJdbcServer(kind, name) {
    const conn = await connection;
    const [rows, fields] = await conn.execute("SELECT * FROM connect_jdbc WHERE kind = ? AND name = ?", [kind, name]);
    return rows[0];
}

function querySshServer(name) {
    const conn = await connection;
    const [rows, fields] = await conn.execute("SELECT * FROM connect_ssh WHERE name = ?", [name]);
    return rows[0];
}

exports.queryJdbcServer = queryJdbcServer;
exports.querySshServer = querySshServer;

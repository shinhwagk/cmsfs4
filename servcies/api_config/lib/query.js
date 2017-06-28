"use strict";

const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
    host: 'mysql.cmsfs.org',
    user: 'root',
    password: '123456aA+',
    database: 'cmsfs'
});

async function queryServer(tab) {
    const conn = await connection;
    const [rows, fields] = await conn.execute(`SELECT * FROM ${tab}`);
    return rows
}

async function queryConfig(tab, process) {
    const conn = await connection;
    const [rows, fields] = await conn.execute(`SELECT * FROM ${tab} where process = ?`, [process]);
    return rows[0]
}

exports.queryConfig = queryServer
exports.queryServer = queryServer
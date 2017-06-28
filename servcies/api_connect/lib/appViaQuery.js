"use strict";

const query = require("./query");

exports.qJdbcServer = async (ctx) =>{
    const kind = ctx.params.kind;
    const name = ctx.params.name;
    ctx.body = await query.queryJdbcServer(kind, name) || '{}';
};

exports.qSshServer = async (ctx) =>  {
    const name = ctx.params.name;
    ctx.body = await query.querySshServer(name) || '{}';
};

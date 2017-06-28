"use strict";

const query_1 = require("./query");

exports.qConfig = async (ctx) => {
    const tab = `monitor_${ctx.params.monitor}_config`;
    const process = ctx.params.process;
    ctx.body = yield query_1.queryConfig(tab, process);
};

exports.qServer = async (ctx) => {
    const tab = `monitor_${ctx.params.monitor}_server`
    ctx.body = await queryServer(tab)
}

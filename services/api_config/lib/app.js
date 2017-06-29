"use strict";

const Koa = require("koa");
const KoaRouter = require("koa-router");
const appViaQuery = require("./appViaQuery");

exports.koa = new Koa();
const koaRouter = new KoaRouter();

koaRouter
    .get("/v1/monitor/:monitor/process/:process", appViaQuery_1.qConfig)
    .get("/v1/monitor/:monitor/server", appViaQuery_1.qServer);

koa.use(koaRouter.routes()).use(koaRouter.allowedMethods());

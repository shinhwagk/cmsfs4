"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const KoaRouter = require("koa-router");
const bodyParser = require("koa-bodyparser");
const kafka_1 = require("./kafka");
exports.koa = new Koa();
const koaRouter = new KoaRouter();
exports.koa.use(bodyParser({ strict: false }));
koaRouter.post("/v1/error/:monitor", (ctx) => {
    kafka_1.sendKafka(ctx.params.monitor, ctx.request.body);
    ctx.status = 200;
});
exports.koa.use(koaRouter.routes()).use(koaRouter.allowedMethods());

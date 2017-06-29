"use strict";

const Koa = require("koa");
const KoaRouter = require("koa-router");
const bodyParser = require("koa-bodyparser");

const apiPhone = require("./phone")

const koa = new Koa();
const koaRouter = new KoaRouter();

koa.use(bodyParser());

// {"phones":["xx"],"content":""}
koaRouter
  .post("/v1/notice/phone", async (ctx) => { await apiPhone.send(ctx.request.body).then(i => ctx.status = 200) })
// .post("/v1/notice/mail", appViaQuery_1.qServer);

koa.use(koaRouter.routes()).use(koaRouter.allowedMethods());

exports.koa = koa
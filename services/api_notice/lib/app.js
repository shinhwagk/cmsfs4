"use strict";

const Koa = require("koa");
const KoaRouter = require("koa-router");
const apiPhone = require("./phone")

exports.koa = new Koa();
const koaRouter = new KoaRouter();


// {"phones":["xx"],"content":""}
koaRouter
  .post("/v1/notice/phone", async (ctx) => { apiPhone.send(ctx.body); ctx.status = 200 })
// .post("/v1/notice/mail", appViaQuery_1.qServer);

koa.use(koaRouter.routes()).use(koaRouter.allowedMethods());

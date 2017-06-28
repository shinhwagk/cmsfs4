"use strict";

const Koa = require("koa");
const KoaRouter = require("koa-router");
const appViaQuery = require("./appViaQuery");

import { qSshServer, qJdbcServer } from './appViaQuery'

exports.koa = new Koa();

const koaRouter = new KoaRouter();

koaRouter
    .get("/v1/connect/jdbc/:kind/:name", qJdbcServer)
    .get("/v1/connect/ssh/:name", qSshServer);

koa.use(koaRouter.routes()).use(koaRouter.allowedMethods());
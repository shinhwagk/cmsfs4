import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import * as bodyParser from 'koa-bodyparser'

import { sendKafka } from './kafka';

export const koa = new Koa();
const koaRouter = new KoaRouter();

koa.use(bodyParser({ strict: false }));

koaRouter.post("/v1/error/:monitor", (ctx) => {
  sendKafka(ctx.params.monitor, ctx.request.body)
  ctx.status = 200
})

koa.use(koaRouter.routes()).use(koaRouter.allowedMethods());

import * as Koa from 'koa';
import * as json from 'koa-json';
import * as bodyparser from 'koa-bodyparser';
import * as logger from 'koa-logger';
import * as onerror from 'koa-onerror';
import index from './routes/index';
const app=new Koa();

// error handler
onerror(app);

// middlewares
app.use(bodyparser());
app.use(json());
app.use(logger());

//routes
app.use(index.routes());

export default app;
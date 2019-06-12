import * as Koa from 'koa';
import * as json from 'koa-json';
import * as bodyparser from 'koa-body';
import * as logger from 'koa-logger';
import * as onerror from 'koa-onerror';
import * as session from 'koa-session';
import index from './routes/index';

const app = new Koa();

// error handler
onerror(app);

//session
app.keys = ['some_secret_hurr'];


app.use(session({
    key: 'tckxjzc',
    maxAge: 1000 * 60 * 60 * 24 * 7,
    // @ts-ignore
}, app));


// middlewares

app.use(bodyparser());
app.use(json());
app.use(logger());


//routes
app.use(index.routes());

export default app;

import * as  Router from 'koa-router';

const router =new Router();

router.get('/',async (ctx)=>{
    ctx.body='home-9';
});


export default router;
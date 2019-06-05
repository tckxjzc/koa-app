
/**
 * env
 */
const isDev=process.env.TZ_ENV!='dev';
export default {
    prods:isDev,
    debug:isDev,
}
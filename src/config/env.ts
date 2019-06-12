
/**
 * env
 */
const __DEV__=process.argv.includes('--dev');
export default {
    __DEV__,
    debug:__DEV__,
}

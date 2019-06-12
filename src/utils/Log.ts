import debug from 'debug';
import env from '../config/env';
import {serverConfig} from '../config'


const iName = `${serverConfig.name}:log`;
const dName = `${serverConfig.name}:d`;
debug.enable(iName);
if (env.debug) {
    debug.enable('*');
}

const i = debug(iName);
i.log = console.log.bind(console);

const d = debug(dName);

export default {
    i,
    d
}
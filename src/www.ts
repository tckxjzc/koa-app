import app from './app';
import {serverConfig} from './config';
import * as http from 'http';
import Log from "./utils/Log";


const server = http.createServer(app.callback());

server.listen(serverConfig.port);

server.on('error', function (e) {
    Log.i(e);
});
server.on('listening', function () {
    let addr = server.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    Log.d('Listening on ' + bind);
});
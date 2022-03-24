import fs from 'fs';
import http from 'http';
import https from 'https';

import App from './app';
import config from './config';

const { app } = new App();

server().listen(config.port);

function server() {
    if (process.env.NODE_ENV === 'production') {
        const privateKey = fs.readFileSync(
            config.certDir + 'privkey.pem',
            'utf8'
        );

        const certificate = fs.readFileSync(
            config.certDir + 'fullchain.pem',
            'utf8'
        );

        const credentials = {
            key: privateKey,
            cert: certificate,
        };

        return https.createServer(credentials, app);
    }
    else {
        return http.createServer(app);
    }
}
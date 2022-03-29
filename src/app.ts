import express from 'express';
import mongoose from 'mongoose';

import helmet from "helmet";
import bearerToken from "express-bearer-token";

import config from './config';
import { IAuth } from './types';

import authRouter from './routes/auth';
import lectureRouter from './routes/lecture';
import errorHandler from './middlewares/error-handler';

declare global {
    namespace Express {
        interface Request {
            auth?: IAuth
        }
    }
}

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.useMiddlewares();
        this.useRouters();
        this.useErrorHandler();
        this.connectMongoDB();
    }

    private useMiddlewares() {
        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(bearerToken({
            headerKey: 'Bearer',
            cookie: {
                signed: true,
                secret: config.cookieSecret,
                key: 'token',
            },
            reqKey: 'token',
        }));
    }

    private useRouters() {
        this.app.use('/auth', authRouter);
        this.app.use('/lecture', lectureRouter);
    }

    private useErrorHandler() {
        this.app.use(errorHandler);
    }

    private connectMongoDB() {
        mongoose.connect(config.mongoUri)
            .then(() => console.log('DB: Connected'));
    }
}

export default App;
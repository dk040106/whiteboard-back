import express from 'express';
import mongoose from 'mongoose';

import helmet from "helmet";
import bearerToken from "express-bearer-token";

import config from './config';

import authRouter from './routes/auth';
import lectureRouter from './routes/lecture';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.useMiddlewares();
        this.useRouters();
        this.connectMongoDB();
    }

    private useMiddlewares() {
        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(bearerToken({
            headerKey: 'Bearer',
            reqKey: 'token',
        }));
    }

    private useRouters() {
        this.app.use('/auth', authRouter);
        this.app.use('/lecture', lectureRouter);
    }

    private connectMongoDB() {
        mongoose.connect(config.mongoUri)
            .then(() => console.log('DB: Connected'))
            .catch(() => console.log('DB: Error Occured'));
    }
}

export default App;
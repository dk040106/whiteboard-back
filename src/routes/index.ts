import { Router, RequestHandler } from 'express';
import checkAuth from '../middlewares/check-auth';

type HTTPMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface Route {
    method: HTTPMethod;
    path: string;
    auth: boolean;
    handler: RequestHandler;
}

export const createRouter = (routes: Route[]): Router => {
    const router = Router();

    routes.forEach(route => {
        router[route.method](
            route.path,
            ... route.auth ? [checkAuth] : [],
            route.handler,
        );
    });

    return router;
}
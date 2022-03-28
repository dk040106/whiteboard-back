import { Router } from 'express';
import { IRoute } from '../types';
import checkPermission from '../middlewares/check-permission';

export const createRouter = (routes: IRoute[]): Router => {
    const router = Router();

    routes.forEach(route => {
        router[route.method](
            route.path,
            ...route.permission ? [checkPermission] : [],
            route.handler,
        );
    });

    return router;
}
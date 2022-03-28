import * as controllers from './controllers';
import { createRouter } from '../index';

export default createRouter([
    {
        method: 'get', // get all lectures
        path: '/',
        permission: {},
        handler: controllers.find,
    },
    {
        method: 'get', // get all lectures of a user
        path: '/:userID',
        permission: {},
        handler: controllers.find,
    },
    {
        method: 'post',
        path: '/create',
        permission: {},
        handler: controllers.find,
    },
    {
        method: 'delete',
        path: '/:courseID',
        permission: {},
        handler: controllers.find,
    },
    {
        method: 'put',
        path: '/:courseID',
        permission: {},
        handler: controllers.find,
    }
]);
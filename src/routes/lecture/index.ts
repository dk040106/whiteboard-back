import * as controllers from './controllers';
import { createRouter } from '../index';

export default createRouter([
    {
        method: 'get', // get all lectures
        path: '/',
        auth: false,
        handler: controllers.signin,
    },
    {
        method: 'get', // get all lectures of a user
        path: '/:userID',
        auth: false,
        handler: controllers.signin,
    },
    {
        method: 'post',
        path: '/create',
        auth: false,
        handler: controllers.signin,
    },
    {
        method: 'delete',
        path: '/:courseID',
        auth: false,
        handler: controllers.signin,
    },
    {
        method: 'put',
        path: '/:courseID',
        auth: false,
        handler: controllers.login,
    }
]);
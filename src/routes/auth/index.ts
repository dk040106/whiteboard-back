import * as controllers from './controllers';
import { createRouter } from '../index';

export default createRouter([
    {
        method: 'post',
        path: '/signin',
        auth: false,
        handler: controllers.signin,
    },
    {
        method: 'post',
        path: '/login',
        auth: false,
        handler: controllers.login,
    }
]);
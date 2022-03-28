import * as controllers from './controllers';
import { createRouter } from '../index';

export default createRouter([
    {
        method: 'post',
        path: '/signup',
        handler: controllers.signup,
    },
    {
        method: 'post',
        path: '/login',
        handler: controllers.login,
    }
]);
import * as controllers from './controllers';
import { createRouter } from '../index';

export default createRouter([
    {
        method: 'get', // get all lectures
        path: '/',
        permission: {
            userTypes: ['S']
        },
        handler: controllers.allLecture,
    },
    {
        method: 'post',
        path: '/:lectureId/enroll',
        permission: {
            userTypes: ['S'],
            inLecture: false
        },
        handler: controllers.enrollLecture
    },
    {
        method: 'get', // get all lectures of a user
        path: '/:userId',
        permission: {},
        handler: controllers.userLecture,
    },
    {
        method: 'post',
        path: '/',
        permission: {
            userTypes: ['P'],
        },
        handler: controllers.createLecture,
    }
]);
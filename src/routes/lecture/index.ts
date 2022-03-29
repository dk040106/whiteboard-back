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
        path: '/',
        permission: {
            userTypes: ['P'],
        },
        handler: controllers.createLecture,
    },
    {
        method: 'get', // get all lectures of a user
        path: '/user/:userId',
        permission: {},
        handler: controllers.lectureOfUser,
    },
    {
        method: 'get',
        path: '/:lectureId',
        permission: {},
        handler: controllers.getLecture,
    },
    {
        method: 'post', // enroll to this lecture
        path: '/:lectureId/enroll',
        permission: {
            userTypes: ['S'],
            inLecture: false
        },
        handler: controllers.enrollLecture
    },
    {
        method: 'post',
        path: '/lecture/:lectureId/student',
        permission: {
            userTypes: ['P'],
            inLecture: true
        },
        handler: controllers.allStudent
    },
    {
        method: 'delete',
        path: '/lecture/:lectureId/student/:stduentId',
        permission: {
            userTypes: ['P'],
            inLecture: true
        },
        handler: controllers.deleteStudent
    },
    {
        method: 'get',
        path: '/lecture/:lectureId/post',
        permission: {
            inLecture: true
        },
        handler: controllers.allPost
    },
    {
        method: 'post',
        path: '/lecture/:lectureId/post',
        permission: {
            userTypes: ['P'],
            inLecture: true
        },
        handler: controllers.createPost
    },
    {
        method: 'get',
        path: '/lecture/:lectureId/post/:postID',
        permission: {
            inLecture: true
        },
        handler: controllers.getPost
    },
]);
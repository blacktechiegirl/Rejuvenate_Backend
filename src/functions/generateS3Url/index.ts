import { handlerPath } from '@libs/handler-resolver';

export const generateUploadURL = {
    handler: `${handlerPath(__dirname)}/handler.generateUploadURL`,
    name: 'generateUploadURL',
    memorySize: 128,
    timeout: 15,
    events: [
        {
            http: {
                method: 'get',
                path: 's3url/{imagename}',
                cors: true
            },
        },
    ],
};


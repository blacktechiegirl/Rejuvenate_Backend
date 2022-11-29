import { handlerPath } from '@libs/handler-resolver';
export const getAllProducts = {
    handler: `${handlerPath(__dirname)}/handler.getAllProducts`,
    name: 'getAllProducts',
    memorySize: 128,
    timeout: 15,
    events: [
        {
            http: {
                method: 'get',
                path: 'product',
                cors: true
            },
        },
    ],
};

export const createProduct = {
    handler: `${handlerPath(__dirname)}/handler.createProduct`,
    events: [
        {
            http: {
                method: 'post',
                path: 'product',
            },
        },
    ],
};

export const getProductById = {
    handler: `${handlerPath(__dirname)}/handler.getProductById`,
    events: [
        {
            http: {
                method: 'get',
                path: 'product/{id}',
            },
        },
    ],
};

export const getProductByCategory = {
    handler: `${handlerPath(__dirname)}/handler.getProductByCategory`,
    events: [
        {
            http: {
                method: 'get',
                path: 'product/category/{category}',
            },
        },
    ],
};
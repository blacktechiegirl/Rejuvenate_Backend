import { handlerPath } from '@libs/handler-resolver';

export const getAllCartItems = {
    handler: `${handlerPath(__dirname)}/handler.getAllCartItems`,
    name: 'getAllCartItems',
    events: [
        {
            http: {
                method: 'get',
                path: 'cart/{userId}',
            },
        },
    ],
};

export const createCartItem = {
    handler: `${handlerPath(__dirname)}/handler.createProduct`,
    events: [
        {
            http: {
                method: 'post',
                path: 'cart',
            },
        },
    ],
};

export const deleteCartItem = {
    handler: `${handlerPath(__dirname)}/handler.deleteCartItem`,
    events: [
        {
            http: {
                method: 'delete',
                path: 'cart/{productId}',
            },
        },
    ],
};


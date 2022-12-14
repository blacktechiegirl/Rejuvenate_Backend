import { handlerPath } from '@libs/handler-resolver';

export const getAllCartItems = {
    handler: `${handlerPath(__dirname)}/handler.getAllCartItems`,
    name: 'getAllCartItems',
    events: [
        {
            http: {
                method: 'get',
                path: 'cart/items/{userId}',
                cors: true

            },
        },
    ],
};

export const createCartItem = {
    handler: `${handlerPath(__dirname)}/handler.createCartItems`,
    events: [
        {
            http: {
                method: 'post',
                path: 'cart',
                cors: true
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
                cors: true

            },
        },
    ],
};

export const updateQuantity = {
    handler: `${handlerPath(__dirname)}/handler.updateQuantity`,
    events: [
        {
            http: {
                method: 'put',
                path: 'cart',
                cors: true

            },
        },
    ],
};

export const getRelatedItems = {
    handler: `${handlerPath(__dirname)}/handler.relatedItems`,
    name: 'getRelatedItems',
    events: [
        {
            http: {
                method: 'get',
                path: 'related/items/{userId}',
                cors: true

            },
        },
    ],
};

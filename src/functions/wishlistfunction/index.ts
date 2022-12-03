import { handlerPath } from '@libs/handler-resolver';

export const getAllWishlistItems = {
    handler: `${handlerPath(__dirname)}/handler.getAllWishlistItems`,
    name: 'getAllWishlistItems',
    events: [
        {
            http: {
                method: 'get',
                path: 'wishlist/{userId}',
            },
        },
    ],
};

export const createWishlistItem = {
    handler: `${handlerPath(__dirname)}/handler.createWishlistItem`,
    events: [
        {
            http: {
                method: 'post',
                path: 'wishlist/add',
            },
        },
    ],
};

export const deleteWishlistItem = {
    handler: `${handlerPath(__dirname)}/handler.deleteWishlistItem`,
    events: [
        {
            http: {
                method: 'delete',
                path: 'wishlist/delete/{productId}',
            },
        },
    ],
};


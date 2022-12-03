import ProductService from "./productservice";

import { dynamoDBClient } from "src/model";
import CartService from "./cartservice";
import WishlistService from "./wishlist";

export const productservice = new ProductService(dynamoDBClient());
export const cartservice = new CartService(dynamoDBClient());
export const wishlistservice = new WishlistService(dynamoDBClient());


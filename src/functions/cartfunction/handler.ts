import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy, corsmiddyfy } from "@libs/lambda";
import { cartservice, productservice } from "src/service";
import { v4 } from "uuid";

export const getAllCartItems = middyfy(
  async (event): Promise<APIGatewayProxyResult> => {
    try {
      const userId = event.pathParameters.userId;
      const cart = await cartservice.getAllCartItems(userId);
      const products = await productservice.getAllProducts();
      let cartitems = [];
      products.map((item) => {
        cart.map((newcartitem) => {
          if (newcartitem.productId === item.productId) {
            cartitems.push({ ...item, ...newcartitem });
          }
        });
      });

      let totalQuantity = 0
      cartitems.map((newitem)=> {
        totalQuantity = totalQuantity + newitem.quantity
      })

      return formatJSONResponse({
        cartitems,
        totalQuantity
      });
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e,
      });
    }
  }
);

export const deleteCartItem = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const productId = event.pathParameters.productId;
    try {
      const cartId = await cartservice.deleteProduct(productId);
      return formatJSONResponse({
        cartId,
        message: 'item deleted from cart'
      });
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e,
      });
    }
  }
);

export const createCartItems = corsmiddyfy(
  async (event): Promise<APIGatewayProxyResult> => {
    try {
      const body: {
        userId: string;
        productId: string;
        quantity: number;
      } = event.body;

      const cartId = v4();

      const newproduct = await cartservice.createProduct({
        cartId: cartId,
        productId: body.productId,
        userId: body.userId,
        quantity: body.quantity,
        createdAt: new Date().getTime(),
      });

      return formatJSONResponse({
        newproduct,
      });
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e,
      });
    }
  }
);

export const updateQuantity = middyfy(
  async (event): Promise<APIGatewayProxyResult> => {
    try {
      const body: {
        cartId: string;
        newQuantity: number;
      } = event.body;
      const product = await cartservice.changeQuantity(body.cartId, body.newQuantity);
      return formatJSONResponse({
        message: 'Product updated successfully',
        product,
      });
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e,
      });
    }
  }
);

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
      let cartitems =[]
      products.map((item) => {
        cart.map((newcartitem) => {
          if (newcartitem.productId === item.productId) {
            cartitems.push({...item, ...newcartitem})
          }
        });
      });

      return formatJSONResponse({
        cartitems,
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
      const product = await cartservice.deleteProduct(productId);
      return formatJSONResponse({
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

export const createCartItems = corsmiddyfy(
  async (event): Promise<APIGatewayProxyResult> => {
    const response = { 
      statusCode: 200,
      headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*"
      },
   };
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
        response,
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

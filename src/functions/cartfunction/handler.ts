import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { cartservice } from "src/service";

export const getAllCartItems = middyfy(
  async (event): Promise<APIGatewayProxyResult> => {
    try {
      const userId = event.pathParameters.userId;
      const products = await cartservice.getAllCartItems(userId);
      return formatJSONResponse({
        products,
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

export const createProduct = middyfy(
  async (event): Promise<APIGatewayProxyResult> => {
    try {
      const body: {
        userId: string;
        productId: string;
        quantity: number;
      } = event.body;

      const newproduct = await cartservice.createProduct({
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

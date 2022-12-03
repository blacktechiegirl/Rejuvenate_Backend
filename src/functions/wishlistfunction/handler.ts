import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { wishlistservice } from "src/service";

export const getAllWishlistItems = middyfy(
  async (event): Promise<APIGatewayProxyResult> => {
    try {
      const userId = event.pathParameters.userId;
      const products = await wishlistservice.getAllWishlistItems(userId);
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

export const deleteWishlistItem = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const productId = event.pathParameters.productId;
    try {
      const product = await wishlistservice.deleteProduct(productId);
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

export const createWishlistItem = middyfy(
  async (event): Promise<APIGatewayProxyResult> => {
    try {
      const body: {
        userId: string;
        productId: string;
      } = event.body;

      const newproduct = await wishlistservice.createProduct({
        productId: body.productId,
        userId: body.userId,
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

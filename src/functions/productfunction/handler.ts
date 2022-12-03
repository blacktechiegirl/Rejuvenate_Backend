import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy, validmiddyfy } from "@libs/lambda";
import { v4 } from "uuid";
import {productservice} from "src/service";

export const getAllProducts = middyfy(
  async (): Promise<APIGatewayProxyResult> => {
    try {
      const products = await productservice.getAllProducts();
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

export const getProductById = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
      const ProductDetails = await productservice.getProductById(id);
      return formatJSONResponse({
        ProductDetails,
      });
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e,
      });
    }
  }
);

export const getProductByCategory = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const category = event.pathParameters.category;
    try {
      const products = await productservice.getProductByCategory(category);
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

export const createProduct = validmiddyfy(
  async (event): Promise<APIGatewayProxyResult> => {
    try {
      const body: {
        productName: string;
        price: number;
        category: string[];
        quantity: number;
        imageURL: string;
        ratings: number;
      } = event.body;

      const productId = v4();
      const newproduct = await productservice.createProduct({
        productId: productId,
        productName: body.productName,
        price: body.price,
        category: body.category,
        quantity: body.quantity,
        imageURL: body.imageURL,
        ratings: body.ratings,
        createdAt: new Date().getTime(),
      });

      const detailproduct = await productservice.createProductDetails({
        productId: productId,
        description: body.description,
        benefits: body.benefits,
        imageURL: body.imageURL,
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

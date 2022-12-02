import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import validator from "@middy/validator";
import cors from '@middy/http-cors'


const inputSchema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        productName: { type: "string" },
        price: { type: "number" },
        category: { type: "array"},
        quantity: { type: "number" },
        imageURL: { type: "string" },
        ratings: { type: "number" },
        description: {type: "string"},
        benefits: {type: "string"}
      },

      required: [
        "productName",
        "price",
        "category",
        "ratings",
        "quantity",
        "imageURL",
        "description"
      ],
    },
  },
};

export const middyfy = (handler) => {
  return middy(handler).use(middyJsonBodyParser()).use(httpErrorHandler()).use(cors())
  
};

export const validmiddyfy = (handler) => {
  return middy(handler).use(middyJsonBodyParser()).use(cors()).use(httpErrorHandler()).use(
    validator({
      inputSchema,
    })
  );
};

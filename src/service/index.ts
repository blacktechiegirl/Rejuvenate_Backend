import ProductService from "./productservice";

import { dynamoDBClient } from "src/model";

const productservice = new ProductService(dynamoDBClient());

export default productservice;

import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { Cart } from "src/model/Cart";
import { createBrotliDecompress } from "zlib";


export default class CartService {
  private Tablename: string = "cart-items-table";

  constructor(private docDB: DocumentClient) {}

  async getAllCartItems(userId: string): Promise<Cart[]> {
    const products = await this.docDB
      .scan({
        TableName: this.Tablename,
      })
      .promise();

      const newdata = products.Items.filter((item) =>
      item.userId === userId
    );
    return newdata as Cart[];

  }


  async createProduct(newproduct: Cart): Promise<Cart> {
    await this.docDB
      .put({
        TableName: this.Tablename,
        Item: newproduct,
      })
      .promise();

    return newproduct as Cart;
  }

  async deleteProduct(cartId: String) {
    await this.docDB
      .delete({
        TableName: this.Tablename,
        Key: {
          cartId: cartId,
        },      })
      .promise();

  }

  async changeQuantity(cartId: String, newQuantity: Number){
    await this.docDB.update({
      TableName: this.Tablename,
      Key: {
        cartId: cartId,
      },
      ConditionExpression: 'attribute_exists(quantity)',
      UpdateExpression: "SET #attrName = :attrValue",
      ExpressionAttributeNames: {
        "#attrName":  "quantity"
      },
      ExpressionAttributeValues: {":attrValue":  newQuantity},
      ReturnValues: "ALL_NEW",
    
    }).promise();
  }

}

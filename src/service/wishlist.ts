import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { Wishlist } from "src/model/wishlist";


export default class WishlistService {
  private Tablename: string = "wishlist-table";

  constructor(private docDB: DocumentClient) {}

  async getAllWishlistItems(userId: string): Promise<Wishlist[]> {
    const products = await this.docDB
      .scan({
        TableName: this.Tablename,
      })
      .promise();

      const newdata = products.Items.filter((item) =>
      item.userId === userId
    );
    return newdata as Wishlist[];

  }


  async createProduct(newproduct: Wishlist): Promise<Wishlist> {
    await this.docDB
      .put({
        TableName: this.Tablename,
        Item: newproduct,
      })
      .promise();

    return newproduct as Wishlist;
  }

  async deleteProduct(productId: String) {
    await this.docDB
      .delete({
        TableName: this.Tablename,
        Key: {
          productId: productId,
        },      })
      .promise();

  }

}

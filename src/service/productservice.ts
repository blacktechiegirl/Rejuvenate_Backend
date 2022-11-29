import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { Product, ProductDetails } from "src/model/Product";

export default class ProductService {
  private Tablename: string = "product-table";
  private ProductTable: string = "product-details-table";

  constructor(private docDB: DocumentClient) {}

  async getAllProducts(): Promise<Product[]> {
    const products = await this.docDB
      .scan({
        TableName: this.Tablename,
      })
      .promise();

    return products.Items as Product[];
  }

  async getProductById(id: string) {
    const productDetails = await this.docDB
      .get({
        TableName: this.ProductTable,
        Key: {
          productId: id,
        },
      })
      .promise();

      const product = await this.docDB
      .get({
        TableName: this.Tablename,
        Key: {
          productId: id,
        },
      })
      .promise();
      const product1 = productDetails.Item
      const product2 = product.Item

      const newproduct = {...product1, ...product2}
      console.log(newproduct)

    return newproduct;
  }

  async getProductByCategory(category: string): Promise<Product[]> {
    const product = await this.docDB
      .scan({
        TableName: this.Tablename,
      })
      .promise();

    const newdata = product.Items.filter((item) =>
      item.category.includes(category)
    );
    return newdata as Product[];
  }

  async createProduct(newproduct: Product): Promise<Product> {
    await this.docDB
      .put({
        TableName: this.Tablename,
        Item: newproduct,
      })
      .promise();

    return newproduct as Product;
  }

  async createProductDetails(newproduct: ProductDetails): Promise<ProductDetails> {
    await this.docDB
      .put({
        TableName: this.ProductTable,
        Item: newproduct,
      })
      .promise();

    return newproduct as ProductDetails;
  }

}

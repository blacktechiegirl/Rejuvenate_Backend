import type { AWS } from '@serverless/typescript';
import {createProduct, getAllProducts, getProductByCategory, getProductById , generateUploadURL, getAllCartItems, createCartItem, deleteCartItem,getAllWishlistItems, createWishlistItem, deleteWishlistItem } from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'rejuvenate-backend',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dynamodb-local'],
  custom:{
    tables: {
      productTable: 'product-table',
      productDetailsTable: 'product-details-table',
      reviewsTable: 'reviews-table',
      cartTable: 'cart-table',
      cartItemsTable: 'cart-items-table',
      wishlistTable: 'wishlist-table'
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamodb:{
      start:{
        port: 5000,
        inMemory: true,
        migrate: true,
      },
      stages: "dev"
    },
    serverlessoffline:{
      resourceRoutes: true
    }
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iam: {
      role: {
        statements: [{
          Effect: "Allow",
          Action: "*",
          Resource: [
            'arn:aws:dynamodb:${self:provider.region}:*:table/${self:custom.tables.productTable}',
            'arn:aws:dynamodb:${self:provider.region}:*:table/${self:custom.tables.productDetailsTable}',
            'arn:aws:dynamodb:${self:provider.region}:*:table/${self:custom.tables.reviewsTable}',
            'arn:aws:dynamodb:${self:provider.region}:*:table/${self:custom.tables.cartTable}',
            'arn:aws:dynamodb:${self:provider.region}:*:table/${self:custom.tables.cartItemsTable}',
            'arn:aws:dynamodb:${self:provider.region}:*:table/${self:custom.tables.wishlistTable}',
            'arn:aws:s3:::rejuvenatebucket2022',
          ],
        }],
      },
    },
  },
  // import the function via paths
  functions: {createProduct, getAllProducts, getProductByCategory, getProductById , generateUploadURL,getAllCartItems, createCartItem, deleteCartItem,getAllWishlistItems, createWishlistItem, deleteWishlistItem  },
  package: { individually: true },
  resources: {
    Resources: {
      ProductTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "product-table",
          AttributeDefinitions: [{
            AttributeName: "productId",
            AttributeType: "S",
          }],
          KeySchema: [{
            AttributeName: "productId",
            KeyType: "HASH"
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          },

        }
      },
      ProductDetailsTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "product-details-table",
          AttributeDefinitions: [{
            AttributeName: "productId",
            AttributeType: "S",
          }],
          KeySchema: [{
            AttributeName: "productId",
            KeyType: "HASH"
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          },

        }
      },
      ReviewsTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "reviews-table",
          AttributeDefinitions: [{
            AttributeName: "productId",
            AttributeType: "S",
          }],
          KeySchema: [{
            AttributeName: "productId",
            KeyType: "HASH"
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          },

        }
      },
      CartTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "cart-items-table",
          AttributeDefinitions: [{
            AttributeName: "cartId",
            AttributeType: "S",
          }],
          KeySchema: [{
            AttributeName: "cartId",
            KeyType: "HASH"
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          },

        }
      },
      WishlistTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "wishlist-table",
          AttributeDefinitions: [{
            AttributeName: "userId",
            AttributeType: "S",
          }],
          KeySchema: [{
            AttributeName: "userId",
            KeyType: "HASH"
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          },

        }
      }
    }
  }
};
module.exports = serverlessConfiguration;
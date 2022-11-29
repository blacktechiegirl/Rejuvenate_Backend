import type { AWS } from '@serverless/typescript';
import {createProduct, getAllProducts, getProductByCategory, getProductById , generateUploadURL } from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'rejuvenate backend',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dynamodb-local'],
  custom:{
    tables: {
      productTable: 'product-table',
      productDetailsTable: 'product-details-table',
      reviewsTable: 'reviews-table'
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
          ],
        }],
      },
    },
  },
  // import the function via paths
  functions: {createProduct, getAllProducts, getProductByCategory, getProductById , generateUploadURL },
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
      }
    }
  }
};
module.exports = serverlessConfiguration;
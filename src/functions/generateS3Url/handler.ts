import * as dotenv from 'dotenv'
import {S3} from 'aws-sdk'
import { middyfy } from '@libs/lambda'
import { formatJSONResponse } from "@libs/api-gateway";
import { v4 } from "uuid";



dotenv.config()

const region = "us-east-1"
const bucketName = "rejuvenatebucket2022"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

export const generateUploadURL =middyfy( async(event)=> {
  const imagename = event.pathParameters.imagename
  const uid = v4()
  const params = ({
    Bucket: bucketName,
    Key: `image-${uid}`,
    Expires: 60
  })
  
  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  console.log(imagename)
  return formatJSONResponse({uploadURL})
})
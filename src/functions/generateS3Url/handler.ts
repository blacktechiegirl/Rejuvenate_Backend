import {S3} from 'aws-sdk'
import { middyfy } from '@libs/lambda'
import { formatJSONResponse } from "@libs/api-gateway";
import { v4 } from "uuid";

const bucketName = "rejuvenatebucket2022"
const region = "us-east-1"

const s3 = new S3({
  region,
  signatureVersion: 'v4'
})

export const generateUploadURL =middyfy( async()=> {
  const uid = v4()
  const params = ({
    Bucket: bucketName,
    Key: `image-${uid}`,
    Expires: 60
  })
  
  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  return formatJSONResponse({uploadURL})
})
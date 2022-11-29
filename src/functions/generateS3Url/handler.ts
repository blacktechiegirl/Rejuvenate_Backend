import * as dotenv from 'dotenv'
import {S3} from 'aws-sdk'
import { middyfy } from '@libs/lambda'
import { formatJSONResponse } from "@libs/api-gateway";
import { v4 } from "uuid";



dotenv.config()

const bucketName = "rejuvenatebucket2022"


const s3 = new S3({
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
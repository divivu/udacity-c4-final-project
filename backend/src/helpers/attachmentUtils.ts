import * as AWS from 'aws-sdk'
import * as uuid from 'uuid';

import * as AWSXRay from 'aws-xray-sdk'
import { TodoItem } from '../models/TodoItem'
const XAWS = AWSXRay.captureAWS(AWS)

const bucketName = process.env.ATTACHMENT_S3_BUCKET;
const urlExpiration = process.env.SIGNED_URL_EXPIRATION;
const s3 = new XAWS.S3({
  signatureVersion: 'v4'
});

// TODO: Implement the fileStogare logic

// export async function generateUploadUrl(userId: string): Promise<TodoItem[]> {
//   return todoAccess.getTodos(userId)
// }

// export class AttachmentUtils {
//   async generateUploadUrl() {
//     const attachmentId = uuid.v4();
//     const uploadUrl = s3.getSignedUrl('putObject', {
//       Bucket: bucketName,
//       Key: attachmentId,
//       Expires: urlExpiration
//     });
//     return uploadUrl
//   }
// }

import * as AWS from 'aws-sdk'
import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
// import { createAttachmentPresignedUrl } from '../../helpers/attachmentUtils'
// import { getUserId } from '../utils'
import * as uuid from 'uuid'

const logger = createLogger('TodosAccess')
const bucketName = process.env.ATTACHMENT_S3_BUCKET;
const urlExpiration = process.env.SIGNED_URL_EXPIRATION;
const s3 = new AWS.S3({
  signatureVersion: 'v4'
});

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const attachmentId = uuid.v4();

  // Return a presigned URL to upload a file for a TODOS item with the provided id
  logger.info("Generating upload URL:", {
    todoId: todoId,
    attachmentId: attachmentId
  });

  const uploadUrl = s3.getSignedUrl('putObject', {
    Bucket: bucketName,
    Key: attachmentId,
    Expires: urlExpiration
  });

  // await todoAccess.updateTodoAttachmentUrl(todoId, attachmentId);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      uploadUrl: uploadUrl
    })
  }
}

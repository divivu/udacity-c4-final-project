import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
// import * as middy from 'middy'
// import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
// import { getUserId } from '../utils';
import { createTodo } from '../../helpers/todos'

export const handler =
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
      const newTodo: CreateTodoRequest = JSON.parse(event.body)
      // Implement creating a new TODOs item
      const authorization = event.headers.Authorization
      const split = authorization.split(' ')
      const jwtToken = split[1]

      const newItem = await createTodo(newTodo, jwtToken)

      return {
          statusCode: 201,
          headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true
          },
          body: JSON.stringify({
              newItem
          })
      }
  }

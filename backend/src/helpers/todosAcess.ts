import * as AWS from 'aws-sdk'
// import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
// import { TodoUpdate } from '../models/TodoUpdate';
import {UpdateTodoRequest} from "../requests/UpdateTodoRequest";

// const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('TodosAccess')

// TODO: Implement the dataLayer logic

export class TodosAccess {
  constructor(
    private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
    private readonly todoTable = process.env.TODOITEM_TABLE,
    private readonly indexName = process.env.TODOS_CREATED_AT_INDEX,
    ) {
  }

  async getTodos(userId: string): Promise<TodoItem[]> {
    logger.info(`Fetching todos for userId: ${userId}`)
    const result = await this.docClient.query({
      TableName: this.todoTable,
      IndexName: this.indexName,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    }).promise()
    const items = result.Items
    logger.info('Fetching done', items)
    return items as TodoItem[]
  }

  async createTodo(todo: TodoItem): Promise<TodoItem> {
    logger.info(`Creating new todo item with id ${todo.todoId}`)
    await this.docClient.put({
      TableName: this.todoTable,
      Item: todo
    }).promise()

    return todo;
  }

  async deleteTodo(todoId: string) {
    logger.info("Deleting todo:", {todoId: todoId});
    await this.docClient.delete({
      TableName: this.todoTable,
      Key: {
        "todoId": todoId
      }
    }).promise();
    logger.info("Delete complete.", {todoId: todoId});
  }

  async updateTodo(todoId: string, updatedTodo: UpdateTodoRequest){

    logger.info("Updating todo:", {
      todoId: todoId,
      updatedTodo: updatedTodo
    });
    await this.docClient.update({
      TableName: this.todoTable,
      Key: {
        "todoId": todoId
      },
      UpdateExpression: "set #todoName = :name, done = :done, dueDate = :dueDate",
      ExpressionAttributeNames: {
        "#todoName": "name"
      },
      ExpressionAttributeValues: {
        ":name": updatedTodo.name,
        ":done": updatedTodo.done,
        ":dueDate": updatedTodo.dueDate
      }
    }).promise()

    logger.info("Update complete.")

  }

}

import { TodosAccess } from './todosAcess'
// import { AttachmentUtils } from './attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
// import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
// import * as createError from 'http-errors'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

// TODO: Implement businessLogic

const todoAccess = new TodosAccess()

export async function getTodosForUser(userId: string): Promise<TodoItem[]> {
  return todoAccess.getTodos(userId)
}

export async function updateTodo(todoId: string, updatedTodo: UpdateTodoRequest): Promise<void> {
  return todoAccess.updateTodo(todoId, updatedTodo)
}

export async function deleteTodo(todoId: string): Promise<void> {
  return todoAccess.deleteTodo(todoId)
}

export async function createTodo(
  userId: string,
  newTodo: CreateTodoRequest
): Promise<TodoItem> {
  const logger = createLogger('createTodo')
  logger.info('start create ToDo')

  const todoId = uuid.v4();
  const newTodoWithAdditionalInfo = {
    userId: userId,
    todoId: todoId,
    ...newTodo
  }

  logger.info("Creating new todo item:", newTodoWithAdditionalInfo);

  return await todoAccess.createTodo(newTodoWithAdditionalInfo)
}

import { TodosAccess } from './todosAcess'
// import { AttachmentUtils } from './attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
// import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
// import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
// import * as createError from 'http-errors'
import { parseUserId } from '../auth/utils'
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
  createTodoRequest: CreateTodoRequest,
  jwtToken: string
): Promise<TodoItem> {
  const itemId = uuid.v4()
  const userId = parseUserId(jwtToken)

  return await todoAccess.createTodo({
    userId: userId,
    todoId: itemId,
    createdAt: new Date().toISOString(),
    name: createTodoRequest.name,
    dueDate: createTodoRequest.dueDate,
    done: false,
    attachmentUrl: ''
  })
}

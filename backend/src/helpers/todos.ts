import { TodosAccess } from './todosAcess'
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

// Implement businessLogic

const todoAccess = new TodosAccess()

export async function getTodosForUser(userId: string): Promise<TodoItem[]> {
  return todoAccess.getTodos(userId)
}

export async function updateTodo(todoId: string, userId: string, updatedTodo: UpdateTodoRequest): Promise<void> {
  return todoAccess.updateTodo(todoId, userId, updatedTodo)
}

export async function deleteTodo(todoId: string, userId: string): Promise<void> {
  return todoAccess.deleteTodo(todoId, userId)
}

/**
 * Create TodoItem with additional info
 *
 * @param userId
 * @param newTodo
 */
export async function createTodo(
  userId: string,
  newTodo: CreateTodoRequest
): Promise<TodoItem> {
  const logger = createLogger('createTodo')
  const todoId = uuid.v4();
  const newTodoWithAdditionalInfo = {
    userId: userId,
    todoId: todoId,
    createdAt: new Date().toISOString(),
    done: false,
    attachmentUrl: '',
    ...newTodo
  }

  logger.info("Creating new todo item:", newTodoWithAdditionalInfo);

  return await todoAccess.createTodo(newTodoWithAdditionalInfo)
}

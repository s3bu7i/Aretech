import { Response } from 'express'

class AppError extends Error {
  public statusCode: number
  public isOperational: boolean

  constructor(message: string, statusCode: number, isOperational: boolean = true, stack: string = '') {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    this.statusCode = statusCode
    this.isOperational = isOperational
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400)
  }
}

class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message, 403)
  }
}

class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404)
  }
}

class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, 401)
  }
}

class InternalServerError extends AppError {
  constructor(message: string) {
    super(message, 500)
  }
}

function handleError(error: Error, res: Response) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      error: error.message
    })
  }

  return res.status(500).json({
    error: error?.message || 'An unexpected error occurred!'
  })
}

export { AppError, ValidationError, ForbiddenError, NotFoundError, UnauthorizedError, InternalServerError, handleError }

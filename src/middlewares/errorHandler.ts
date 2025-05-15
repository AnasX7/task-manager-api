import { Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'
import { ZodError } from 'zod'
import config from '@/config'

type ErrorResponse = {
  success: false
  statusCode: number
  error: {
    message: string
    details?: string[]
    stack?: string
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500
  let message = 'Internal Server Error'
  const details: string[] = []

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    statusCode = 400
    message = 'Validation Error'
    err.errors.forEach((error) => {
      details.push(`${error.path.join('.')}: ${error.message}`)
    })
  }
  // Handle HTTP errors
  else if (createHttpError.isHttpError(err)) {
    statusCode = err.statusCode
    message = err.message
  }
  // Handle generic errors
  else {
    message = err.message || message
  }

  // Construct error response
  const errorResponse: ErrorResponse = {
    success: false,
    statusCode,
    error: {
      message,
      ...(details.length > 0 && { details }),
      ...(config.nodeEnv === 'development' && { stack: err.stack }),
    },
  }

  // Send response with both HTTP status code and JSON statusCode
  res.status(statusCode).json(errorResponse)
}

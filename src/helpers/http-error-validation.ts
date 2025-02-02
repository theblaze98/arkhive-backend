import { HttpStatus } from '@nestjs/common'

interface ErrorDetail {
  message: string
  statusCode: number
}

const commonErrors: { [key: string]: ErrorDetail } = {
  INVALID_REFRESH_TOKEN: {
    message: 'Invalid refresh token',
    statusCode: HttpStatus.UNAUTHORIZED,
  },
  INVALID_CREDENTIALS: {
    message: 'Invalid credentials',
    statusCode: HttpStatus.UNAUTHORIZED,
  },
  EMAIL_ALREADY_EXISTS: {
    message: 'Email already exists',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  USER_NOT_FOUND: {
    message: 'User not found',
    statusCode: HttpStatus.NOT_FOUND,
  },
}

export class HttpErrorValidation {
  static getError(key: string): ErrorDetail {
    const error = commonErrors[key]
    if (error) {
      return {
        message: error.message,
        statusCode: error.statusCode,
      }
    }
    return {
      message: 'Internal server error',
      statusCode: 500,
    }
  }
}

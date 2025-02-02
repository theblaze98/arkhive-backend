import { HttpException, HttpStatus } from '@nestjs/common'

export class InvalidCredentialsExeption extends HttpException {
  constructor() {
    super('INVALID_CREDENTIALS', HttpStatus.UNAUTHORIZED)
  }
}

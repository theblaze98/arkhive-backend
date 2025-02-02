import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  HttpException,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './helpers/local.guard'
import { JwtGuard } from './helpers/jwt.guard'
import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe'
import { registerUserDto, registerUserSchema } from './dto'
import { v4 as uuid } from 'uuid'
import { HttpErrorValidation } from '@/helpers/http-error-validation'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body(new ZodValidationPipe(registerUserSchema)) body: registerUserDto,
  ) {
    try {
      const id = uuid()
      const { name, email, password } = body
      return await this.authService.register({ id, name, email, password })
    } catch (error) {
      const { message, statusCode } = HttpErrorValidation.getError(
        error.message,
      )
      throw new HttpException(message, statusCode)
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    try {
      return await this.authService.login(req.user)
    } catch (error) {
      const { message, statusCode } = HttpErrorValidation.getError(
        error.message,
      )
      throw new HttpException(message, statusCode)
    }
  }

  @Post('refresh')
  async refresh(@Body('refresh_token') refreshToken: string) {
    try {
      return await this.authService.refresh(refreshToken)
    } catch (error) {
      const { message, statusCode } = HttpErrorValidation.getError(
        error.message,
      )
      throw new HttpException(message, statusCode)
    }
  }

  @UseGuards(JwtGuard)
  @Post('protected')
  getProtected(@Request() req) {
    return req.user
  }
}

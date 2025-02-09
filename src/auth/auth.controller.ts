import {
  Controller,
  Post,
  UseGuards,
  Request,
  Response,
  Body,
  HttpException,
  Get,
  BadRequestException,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './helpers/local.guard'
import { JwtGuard } from './helpers/jwt.guard'
import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe'
import { registerUserDto, registerUserSchema } from './dto'
import { v4 as uuid } from 'uuid'
import { HttpErrorValidation } from '@/helpers/http-error-validation'
import { Response as TResponse } from 'express'
import { UsersService } from '@/users/users.service'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('register')
  async register(
    @Body(new ZodValidationPipe(registerUserSchema)) body: registerUserDto,
  ) {
    try {
      const { name, email, password } = body

      const existingUser = await this.userService.findOne({ email })

      if (existingUser) {
        throw new BadRequestException('EMAIL_ALREADY_EXISTS')
      }

      const id = uuid()
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
  async login(@Request() req, @Response() res: TResponse) {
    try {
      const { access_token, refresh_token } = await this.authService.login(
        req.user,
      )

      return res
        .cookie('refresh_token', refresh_token, {
          httpOnly: true,
          sameSite: 'strict',
          maxAge: 1000 * 60 * 60 * 24 * 30,
        })
        .json({ access_token })
    } catch (error) {
      const { message, statusCode } = HttpErrorValidation.getError(
        error.message,
      )
      throw new HttpException(message, statusCode)
    }
  }

  @Get('refresh')
  async refresh(@Request() req) {
    try {
      console.log(req.cookies)
      const { refresh_token } = req.cookies
      console.log(refresh_token)
      const { access_token } = await this.authService.refresh(refresh_token)

      return { access_token }
    } catch (error) {
      const { message, statusCode } = HttpErrorValidation.getError(
        error.message,
      )

      console.log(error)

      throw new HttpException(message, statusCode)
    }
  }

  @UseGuards(JwtGuard)
  @Get('protected')
  getProtected(@Request() req) {
    return req.user
  }
}

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { UsersService } from '@/users/users.service'
import { validatePassword } from './helpers/password'
import { JwtService } from '@nestjs/jwt'
import { IUser } from '@/users/interfaces'
import { registerUserDto } from './dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<IUser | null> {
    const user = await this.usersService.findOne({ email })

    if (!user || !validatePassword(password, user.password)) {
      return null
    }

    return user
  }

  async register(data: { id: string } & registerUserDto) {
    const existingUser = await this.usersService.findOne({ email: data.email })
    if (existingUser) {
      throw new BadRequestException('EMAIL_ALREADY_EXISTS')
    }
    const { id, name, email, password } = data
    console.log(data)
    return await this.usersService.create({ id, name, email, password })
  }

  async login(user: IUser) {
    const payload = { sub: user.id }
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' })
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' })

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    }
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken)
      const newAccessToken = this.jwtService.sign(
        { sub: payload.sub },
        { expiresIn: '15m' },
      )
      return {
        access_token: newAccessToken,
      }
    } catch (e) {
      e.message = 'Invalid refresh token'
      throw new UnauthorizedException('INVALID_REFRESH_TOKEN')
    }
  }
}

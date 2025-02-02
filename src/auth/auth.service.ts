import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '@/users/users.service'
import { validatePassword } from './helpers/password'
import { JwtService } from '@nestjs/jwt'
import { IUser } from '@/users/interfaces'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ email })

    if (!user) return null

    if (!validatePassword(password, user.password)) return null

    return user
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
      console.log(e)
      throw new UnauthorizedException('INVALID_REFRESH_TOKEN')
    }
  }
}

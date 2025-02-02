import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { IUser } from '@/users/interfaces'
import { AuthService } from '../auth.service'
import { InvalidCredentialsExeption } from '../exeption'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    })
  }

  async validate(email: string, password: string): Promise<IUser> {
    const user = this.authService.validateUser(email, password)

    if (!user) {
      throw new InvalidCredentialsExeption()
    }

    return user
  }
}

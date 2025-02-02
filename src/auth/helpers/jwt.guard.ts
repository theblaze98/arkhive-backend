import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    )
    if (isPublic) return true

    const canActivate = (await super.canActivate(context)) as boolean

    if (canActivate) {
      const request = context.switchToHttp().getRequest()
      const user = request.user
      if (user) {
        request.userId = user.sub
      }
    }

    return canActivate
  }
}

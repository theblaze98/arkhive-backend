import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe'
import { createWalletSchema, CreateWalletDto } from './dto'
import { WalletService } from './wallet.service'
import { HttpErrorValidation } from '@/helpers/http-error-validation'
import { JwtGuard } from '@/auth/helpers/jwt.guard'

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @UseGuards(JwtGuard)
  @Get()
  async find(@Request() req) {
    const userId = req.userId as string

    return await this.walletService.find({ userId })
  }

  @UseGuards(JwtGuard)
  @Post('/create')
  create(
    @Request() req,
    @Body(new ZodValidationPipe(createWalletSchema)) body: CreateWalletDto,
  ) {
    try {
      const userId = req.userId as string
      const id = uuid()
      return this.walletService.create({ id, userId, ...body })
    } catch (error) {
      const { message, statusCode } = HttpErrorValidation.getError(
        error.message,
      )
      throw new HttpException(message, statusCode)
    }
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() body: Partial<CreateWalletDto>) {
    return this.walletService.update(id, body)
  }
}

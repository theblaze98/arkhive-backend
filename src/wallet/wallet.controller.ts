import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
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

  @Get()
  async find() {
    return await this.walletService.find()
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

  @UseGuards(JwtGuard)
  @Post('/deposit/:id')
  async deposit(@Param('id') id: string, @Body() body: { amount: number }) {
    return await this.walletService.updateBalance(id, body.amount.toString())
  }
}

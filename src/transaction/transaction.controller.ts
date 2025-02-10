import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import { TransactionService } from './transaction.service'
import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe'
import { CreateTransactionDto, createTransactionSchema } from './dto'
import { ITransaction } from './interfaces/transaction.interface'
import { HttpErrorValidation } from '@/helpers/http-error-validation'
import { JwtGuard } from '@/auth/helpers/jwt.guard'

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(
    @Body(new ZodValidationPipe(createTransactionSchema))
    transaction: CreateTransactionDto,
  ): Promise<ITransaction> {
    try {
      const id = uuid()
      return await this.transactionService.create({ id, ...transaction })
    } catch (error) {
      const { message, statusCode } = HttpErrorValidation.getError(error)
      throw new HttpException(message, statusCode)
    }
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ITransaction> {
    try {
      return await this.transactionService.delete(id)
    } catch (error) {
      const { message, statusCode } = HttpErrorValidation.getError(error)
      throw new HttpException(message, statusCode)
    }
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(createTransactionSchema))
    transaction: CreateTransactionDto,
  ): Promise<ITransaction> {
    try {
      return await this.transactionService.update(id, transaction)
    } catch (error) {
      const { message, statusCode } = HttpErrorValidation.getError(error)
      throw new HttpException(message, statusCode)
    }
  }

  @UseGuards(JwtGuard)
  @Get()
  async find(@Query('walletId') walletId: string): Promise<ITransaction[]> {
    try {
      return await this.transactionService.find({ walletId })
    } catch (error) {
      const { message, statusCode } = HttpErrorValidation.getError(error)
      throw new HttpException(message, statusCode)
    }
  }
}

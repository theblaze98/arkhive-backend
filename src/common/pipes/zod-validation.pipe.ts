import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { ZodError, ZodSchema } from 'zod'

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any) {
    try {
      this.schema.parse(value)
      return value
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(`
          ${error.issues[0].path} ${error.issues[0].message}
        `)
      }
      console.log(error)
      throw new BadRequestException('Validation failed')
    }
  }
}

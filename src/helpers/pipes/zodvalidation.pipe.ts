import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ZodType } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {

    constructor(private schema: ZodType) { }

    transform(value: string, metadata: ArgumentMetadata) {
        try {
            const parsedValue = this.schema.parse(value);
            return parsedValue;
        } catch (error) {
            throw new BadRequestException('Validation failed. Check the input data and try again.');
        }
    }
}
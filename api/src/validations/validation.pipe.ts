import {ArgumentMetadata, HttpException, Injectable, PipeTransform} from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype as any, value);
    const errors = await validate(obj);

    if (errors.length) {
      const messages = errors.map(err => {
        return `${Object.values(err.constraints as any).join(". ")}`;
      });


      throw new HttpException(messages, 400)
    }

    return value;
  }
}

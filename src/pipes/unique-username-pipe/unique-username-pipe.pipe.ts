import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class UniqueUsernamePipePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(metadata)
    return value
  }
}

// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateImServerDto } from './create-im-server.dto';

export class UpdateImServerDto extends PartialType(CreateImServerDto) {}

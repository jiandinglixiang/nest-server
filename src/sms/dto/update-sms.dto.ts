// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateSmsDto } from './create-sms.dto';

export class UpdateSmsDto extends PartialType(CreateSmsDto) {}

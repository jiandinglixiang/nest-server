// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateverificationDto } from './create-verification.dto';

export class UpdateverificationDto extends PartialType(CreateverificationDto) {}

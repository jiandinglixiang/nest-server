import { ApiProperty } from '@nestjs/swagger';

export class SendResDto {
  @ApiProperty({
    description: '随机码',
    example: '123456',
  })
  randomCode: string;
}

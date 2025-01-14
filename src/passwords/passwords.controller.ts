// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   UseGuards,
//   Query,
// } from '@nestjs/common';
// import { passwordsService } from './passwords.service';
// import { CreatepasswordDto } from './dto/create-password.dto';
// import { UpdatepasswordDto } from './dto/update-password.dto';
// import {
//   ApiBearerAuth,
//   ApiCreatedResponse,
//   ApiOkResponse,
//   ApiParam,
//   ApiTags,
// } from '@nestjs/swagger';
// import { password } from './domain/password';
// import { AuthGuard } from '@nestjs/passport';
// import {
//   InfinityPaginationResponse,
//   InfinityPaginationResponseDto,
// } from '../utils/dto/infinity-pagination-response.dto';
// import { infinityPagination } from '../utils/infinity-pagination';
// import { FindAllpasswordsDto } from './dto/find-all-passwords.dto';

// @ApiTags('Passwords')
// @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
// @Controller({
//   path: 'passwords',
//   version: '1',
// })
// export class passwordsController {
//   constructor(private readonly passwordsService: passwordsService) {}

//   @Post()
//   @ApiCreatedResponse({
//     type: password,
//   })
//   create(@Body() createpasswordDto: CreatepasswordDto) {
//     return this.passwordsService.create(createpasswordDto);
//   }

//   @Get()
//   @ApiOkResponse({
//     type: InfinityPaginationResponse(password),
//   })
//   async findAll(
//     @Query() query: FindAllpasswordsDto,
//   ): Promise<InfinityPaginationResponseDto<password>> {
//     const page = query?.page ?? 1;
//     let limit = query?.limit ?? 10;
//     if (limit > 50) {
//       limit = 50;
//     }

//     return infinityPagination(
//       await this.passwordsService.findAllWithPagination({
//         paginationOptions: {
//           page,
//           limit,
//         },
//       }),
//       { page, limit },
//     );
//   }

//   @Get(':id')
//   @ApiParam({
//     name: 'id',
//     type: String,
//     required: true,
//   })
//   @ApiOkResponse({
//     type: password,
//   })
//   findById(@Param('id') id: string) {
//     return this.passwordsService.findById(id);
//   }

//   @Patch(':id')
//   @ApiParam({
//     name: 'id',
//     type: String,
//     required: true,
//   })
//   @ApiOkResponse({
//     type: password,
//   })
//   update(
//     @Param('id') id: string,
//     @Body() updatepasswordDto: UpdatepasswordDto,
//   ) {
//     return this.passwordsService.update(id, updatepasswordDto);
//   }

//   @Delete(':id')
//   @ApiParam({
//     name: 'id',
//     type: String,
//     required: true,
//   })
//   remove(@Param('id') id: string) {
//     return this.passwordsService.remove(id);
//   }
// }

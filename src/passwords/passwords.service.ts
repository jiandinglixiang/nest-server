import { Injectable } from '@nestjs/common';
import { Password } from './domain/password';
import { CreatePasswordDto } from './dto/create-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PasswordRepository } from './infrastructure/persistence/password.repository';

@Injectable()
export class PasswordsService {
  constructor(private readonly passwordRepository: PasswordRepository) {}

  async create(createPasswordDto: CreatePasswordDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.passwordRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      operatorUserID: createPasswordDto.operatorUserID,
      password: createPasswordDto.password,
      userID: createPasswordDto.userID,
    });
  }

  findById(userID: Password['userID']) {
    return this.passwordRepository.findById(userID);
  }

  async update(
    userID: Password['userID'],
    updatePasswordDto: UpdatePasswordDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    return this.passwordRepository.update(userID, {
      // Do not remove comment below.
      // <updating-property-payload />
      operatorUserID: updatePasswordDto.operatorUserID,
      password: updatePasswordDto.password,
      userID: updatePasswordDto.userID,
    });
  }

  remove(userID: Password['userID']) {
    return this.passwordRepository.remove(userID);
  }
}

import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { User } from '../../../../domain/user';
import { FilterUserDto, SortUserDto } from '../../../../dto/query-user.dto';
import { UserRepository } from '../../user.repository';
import { PasswordSchemaClass } from '../entities/password.schema';
import { UserSchemaClass } from '../entities/user.schema';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UsersDocumentRepository implements UserRepository {
  constructor(
    @InjectModel(UserSchemaClass.name)
    private readonly usersModel: Model<UserSchemaClass>,
    private readonly passwordsModel: Model<PasswordSchemaClass>,
  ) {}

  async create(data: User): Promise<User> {
    const persistenceModel = UserMapper.toPersistence(data);
    const createdUser = new this.usersModel(persistenceModel);
    const userObject = await createdUser.save();
    return UserMapper.toDomain(userObject);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<User[]> {
    const where: FilterQuery<UserSchemaClass> = {};
    if (filterOptions?.roles?.length) {
      where['role._id'] = {
        $in: filterOptions.roles.map((role) => role.id.toString()),
      };
    }

    const userObjects = await this.usersModel
      .find(where)
      .sort(
        sortOptions?.reduce(
          (accumulator, sort) => ({
            ...accumulator,
            [sort.orderBy === 'userID' ? '_id' : sort.orderBy]:
              sort.order.toUpperCase() === 'ASC' ? 1 : -1,
          }),
          {},
        ),
      )
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return userObjects.map((userObject) => UserMapper.toDomain(userObject));
  }

  async findById(userID: User['userID']): Promise<NullableType<User>> {
    const userObject = await this.usersModel.findById(userID);
    return userObject ? UserMapper.toDomain(userObject) : null;
  }

  async findByIds(userIDs: User['userID'][]): Promise<User[]> {
    const userObjects = await this.usersModel.find({ _id: { $in: userIDs } });
    return userObjects.map((userObject) => UserMapper.toDomain(userObject));
  }

  async findByPhone(
    phoneNumber: User['phoneNumber'],
  ): Promise<NullableType<User>> {
    if (!phoneNumber) return null;

    const userObject = await this.usersModel.findOne({ phoneNumber });
    return userObject ? UserMapper.toDomain(userObject) : null;
  }

  async update(
    userID: User['userID'],
    payload: Partial<User>,
  ): Promise<User | null> {
    const clonedPayload = { ...payload };
    delete clonedPayload.userID;

    const filter = { _id: userID };
    const user = await this.usersModel.findOne(filter);

    if (!user) {
      return null;
    }

    const userObject = await this.usersModel.findOneAndUpdate(
      filter,
      UserMapper.toPersistence({
        ...UserMapper.toDomain(user),
        ...clonedPayload,
      }),
      { new: true },
    );

    return userObject ? UserMapper.toDomain(userObject) : null;
  }

  async remove(userID: User['userID']): Promise<void> {
    await this.usersModel.deleteOne({
      _id: userID,
    });
  }
}

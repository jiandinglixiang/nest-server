import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { UserSchemaClass } from '../entities/user.schema';
import { UserRepository } from '../../user.repository';
import { User } from '../../../../domain/user';
import { UserMapper } from '../mappers/user.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { FilterUserDto } from '../../../../dto/filter-user-dto';
import { SortUserDto } from '../../../../dto/sort-user-dto';

@Injectable()
export class UserDocumentRepository implements UserRepository {
  constructor(
    @InjectModel(UserSchemaClass.name)
    private readonly userModel: Model<UserSchemaClass>,
  ) {}

  async create(data: User): Promise<User> {
    const persistenceModel = UserMapper.toPersistence(data);
    const createdEntity = new this.userModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return UserMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterUserDto | null;
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<User[]> {
    const where: FilterQuery<UserSchemaClass> = {};

    if (filterOptions) {
      Object.keys(filterOptions).forEach((key) => {
        if (!filterOptions[key]) return;
        if (key === 'role') {
          where['role._id'] = {
            $in: filterOptions[key]?.id,
          };
        } else {
          where[key] = filterOptions[key];
        }
      });
    }

    const userObjects = await this.userModel
      .find(where)
      .sort(
        sortOptions?.reduce(
          (accumulator, sort) => ({
            ...accumulator,
            [sort.orderBy === 'id' ? '_id' : sort.orderBy]:
              sort.order.toUpperCase() === 'ASC' ? 1 : -1,
          }),
          {},
        ),
      )
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return userObjects.map((userObject) => UserMapper.toDomain(userObject));
  }

  async findById(id: User['id']): Promise<NullableType<User>> {
    const entityObject = await this.userModel.findById(id);
    return entityObject ? UserMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: User['id'][]): Promise<User[]> {
    const entityObjects = await this.userModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      UserMapper.toDomain(entityObject),
    );
  }

  async findByPhone(
    phoneNumber: User['phoneNumber'],
  ): Promise<NullableType<User>> {
    const userObject = await this.userModel.findOne({ phoneNumber });
    return userObject ? UserMapper.toDomain(userObject) : null;
  }

  async update(
    id: User['id'],
    payload: Partial<User>,
  ): Promise<NullableType<User>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.userModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.userModel.findOneAndUpdate(
      filter,
      UserMapper.toPersistence({
        ...UserMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? UserMapper.toDomain(entityObject) : null;
  }

  async remove(id: User['id']): Promise<void> {
    await this.userModel.deleteOne({ _id: id });
  }
}

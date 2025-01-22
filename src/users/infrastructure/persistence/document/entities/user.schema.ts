import { StatusSchemaClass } from '../../../../../statuses/infrastructure/persistence/document/entities/status.schema';

import { RoleSchemaClass } from '../../../../../roles/infrastructure/persistence/document/entities/role.schema';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';

export type UserSchemaDocument = HydratedDocument<UserSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class UserSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: StatusSchemaClass,
  })
  status: StatusSchemaClass;

  @Prop({
    type: RoleSchemaClass,
  })
  role: RoleSchemaClass;

  @Prop({
    type: Date,
  })
  birthTime: Date;

  @Prop({
    type: Number,
  })
  gender: number;

  @Prop({
    type: String,
  })
  faceUrl: string;

  @Prop({
    type: String,
  })
  nickname: string;

  @Prop({
    type: String,
  })
  areaCode: string;

  @Prop({
    type: String,
    required: true,
  })
  phoneNumber: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserSchemaClass);

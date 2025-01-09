import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';

import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';
import { RoleSchema } from '../../../../../roles/infrastructure/persistence/document/entities/role.schema';

export type UserSchemaDocument = HydratedDocument<UserSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class UserSchemaClass extends EntityDocumentHelper {
  @Prop({ type: String, required: true })
  account: string;

  @Prop({ type: String, required: true })
  phoneNumber: string;

  @Prop({ type: String, required: true, default: '86' })
  areaCode: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  nickname: string;

  @Prop({ type: String })
  faceUrl: string;

  @Prop({ type: Number, enum: [0, 1], default: 0 })
  gender: number;

  @Prop({ type: Date })
  birthTime: Date;

  @Prop({ type: Number })
  level: number;

  @Prop({ type: RoleSchema })
  role: RoleSchema;

  @Prop({ type: Date, default: now })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserSchemaClass);

UserSchema.index({ 'role._id': 1 });

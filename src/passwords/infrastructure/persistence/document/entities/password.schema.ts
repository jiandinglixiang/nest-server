import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';

export type PasswordSchemaDocument = HydratedDocument<PasswordSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class PasswordSchemaClass extends EntityDocumentHelper {
  @Prop({ type: String })
  userID: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String })
  operatorUserID: string;

  @Prop({ type: Date, default: now })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const PasswordSchema = SchemaFactory.createForClass(PasswordSchemaClass);

PasswordSchema.index({ userID: 1 });

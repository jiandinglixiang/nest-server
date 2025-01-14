import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';

export type SmsVerificationSchemaDocument =
  HydratedDocument<SmsVerificationSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class SmsVerificationSchemaClass extends EntityDocumentHelper {
  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  isUsed: boolean;

  @Prop({ required: true })
  expiredAt: Date;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const SmsVerificationSchema = SchemaFactory.createForClass(
  SmsVerificationSchemaClass,
);
SmsVerificationSchema.index({ phoneNumber: 1 });

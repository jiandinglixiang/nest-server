import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';

export type SmsSchemaDocument = HydratedDocument<SmsSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class SmsSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: Boolean,
    index: true,
  })
  isUsed: boolean;

  @Prop({
    type: Date,
  })
  expiredAt: Date;

  @Prop({
    type: String,
  })
  phoneNumber: string;

  @Prop({
    type: String,
  })
  userID: string;

  @Prop({
    type: String,
  })
  code: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const SmsSchema = SchemaFactory.createForClass(SmsSchemaClass);

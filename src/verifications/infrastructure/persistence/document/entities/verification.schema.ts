import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';

export type verificationSchemaDocument =
  HydratedDocument<verificationSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class verificationSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: String,
  })
  code: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const verificationSchema = SchemaFactory.createForClass(
  verificationSchemaClass,
);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';

export type PasswordSchemaDocument = HydratedDocument<PasswordSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class PasswordSchemaClass {
  @Prop({ type: String, required: true })
  userID: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  operatorUserID: string;

  @Prop({ type: Date, default: now })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const PasswordSchema = SchemaFactory.createForClass(PasswordSchemaClass);

PasswordSchema.index({ userID: 1 });

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class SmsDocument extends Document {
  @Prop({ required: true, type: [String] })
  phoneNumbers: string[];

  @Prop({ required: true })
  templateCode: string;

  @Prop({ required: true, type: Object })
  templateParam: Record<string, any>;

  @Prop({ required: true })
  signName: string;

  @Prop({ required: true, enum: ['pending', 'sent', 'failed'] })
  status: 'pending' | 'sent' | 'failed';

  @Prop()
  bizId?: string;

  @Prop()
  requestId?: string;

  @Prop()
  message?: string;
}

export const SmsSchema = SchemaFactory.createForClass(SmsDocument);

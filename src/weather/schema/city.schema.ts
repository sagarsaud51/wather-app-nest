import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Weather } from './weather.schema';

export type CityDocument = City & Document;

@Schema({ timestamps: true })
export class City extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  // @Prop({ default: new Date().getTime() })
  // createdAt?: number;

  // @Prop({ default: new Date().getTime() })
  // updatedAt?: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Weather' })
  weather?: Weather;
}

export const CitySchema = SchemaFactory.createForClass(City);

import mongoose, { Document, SchemaType } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Clouds, MainData, Wind, WeatherBody } from './weather.type';
import { City } from './city.schema';

export type WeatherDocument = Weather & Document;

@Schema()
export class Weather extends Document {
  @Prop({ type: Object })
  weather: WeatherBody[];

  @Prop({ type: Object })
  main: MainData;

  @Prop({ type: Number })
  visibility: number;

  @Prop({ type: Object })
  wind: Wind;

  @Prop({ type: Object })
  rain: object;

  @Prop({ type: Object })
  clouds: Clouds;

  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  cod: number;

  @Prop({ type: Number, default: new Date().getTime() })
  createdAt: number;

  @Prop({ type: Number, default: new Date().getTime() })
  updatedAt!: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'City' })
  city: City;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);

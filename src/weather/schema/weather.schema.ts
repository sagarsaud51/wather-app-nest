import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { City } from './city.schema';
import { Clouds, MainData, WeatherBody, Wind } from './weather.type';

export type WeatherDocument = Weather & Document;

@Schema({ timestamps: true })
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

  @Prop()
  dt: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'City' })
  city: City;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);

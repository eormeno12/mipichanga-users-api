import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Match {
  createdAt: Date;
  id: string;
  name: string;
  date: Date;
}

@Schema({ _id: false })
export class MatchSchema extends Document implements Match {
  @Prop({ type: String, required: true, unique: true })
  id: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ type: Date, required: true })
  createdAt: Date;
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: [MatchSchema], default: [] })
  matches: Match[];
}

export const UserSchema = SchemaFactory.createForClass(User);

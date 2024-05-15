import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export class FieldLocation {
  prefix: string;
  city: string;
  country: string;
}

export class FieldMatch {
  imageUrl: string;
  name: string;
  location: FieldLocation;
}

export class Match {
  createdAt: Date;
  _id: string;
  name: string;
  date: Date;
  field: FieldMatch;
}

@Schema({ _id: false })
export class FieldLocationSchema extends Document implements FieldLocation {
  @Prop({ type: String, required: true })
  prefix: string;

  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: String, required: true })
  country: string;
}

@Schema({ _id: false })
export class FieldMatchSchema extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  _id: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  imageUrl: string;

  @Prop({ type: FieldLocationSchema, required: true })
  location: FieldLocation;
}

@Schema({ _id: false })
export class MatchSchema extends Document implements Match {
  @Prop({ type: Types.ObjectId, required: true })
  _id: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ type: Date, required: true })
  createdAt: Date;

  @Prop({ type: FieldMatchSchema, required: true })
  field: FieldMatch;
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

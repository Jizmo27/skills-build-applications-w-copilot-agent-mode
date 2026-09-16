import { Schema, model, Types } from 'mongoose';

export interface User {
  name: string;
  email: string;
  age?: number;
  team?: Types.ObjectId;
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true },
);

export default model<User>('User', userSchema);

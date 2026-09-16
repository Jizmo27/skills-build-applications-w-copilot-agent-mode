import { Schema, model, Types } from 'mongoose';

export interface Team {
  name: string;
  description?: string;
}

const teamSchema = new Schema<Team>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
  },
  { timestamps: true },
);

export default model<Team>('Team', teamSchema);

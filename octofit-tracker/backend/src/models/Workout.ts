import { Schema, model } from 'mongoose';

export interface Workout {
  name: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
}

const workoutSchema = new Schema<Workout>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true },
  },
  { timestamps: true },
);

export default model<Workout>('Workout', workoutSchema);

import { Schema, model, Types } from 'mongoose';

export interface Leaderboard {
  user: Types.ObjectId;
  team: Types.ObjectId;
  points: number;
  rank: number;
}

const leaderboardSchema = new Schema<Leaderboard>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
  },
  { timestamps: true },
);

export default model<Leaderboard>('Leaderboard', leaderboardSchema);

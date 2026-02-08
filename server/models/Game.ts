import mongoose, { Schema, Document } from 'mongoose';

export interface IGameFrame {
  t: number;
  quarter: number;
  clock: number;
  home: number;
  away: number;
  down: number;
  distance: number;
  yardline: number;
  possession: 'home' | 'away';
  event: string | null;
  win_prob: number;
  description?: string;
}

export interface IRosterPlayer {
  name: string;
  position: string;
  number: string;
  espnId?: string;
}

export interface ITeam {
  name: string;
  city: string;
  abbreviation: string;
  color: string;
  logo: string;
}

export interface IGame extends Document {
  title: string;
  homeTeam: ITeam;
  awayTeam: ITeam;
  homeRoster: IRosterPlayer[];
  awayRoster: IRosterPlayer[];
  frames: IGameFrame[];
  frameInterval: number;
  totalDuration: number;
  status: 'upcoming' | 'live' | 'completed';
  createdAt: Date;
}

const GameFrameSchema = new Schema<IGameFrame>({
  t: { type: Number, required: true },
  quarter: { type: Number, required: true },
  clock: { type: Number, required: true },
  home: { type: Number, required: true },
  away: { type: Number, required: true },
  down: { type: Number, required: true },
  distance: { type: Number, required: true },
  yardline: { type: Number, required: true },
  possession: { type: String, enum: ['home', 'away'], required: true },
  event: { type: String, default: null },
  win_prob: { type: Number, required: true },
  description: { type: String },
}, { _id: false });

const RosterPlayerSchema = new Schema<IRosterPlayer>({
  name: { type: String, required: true },
  position: { type: String, required: true },
  number: { type: String, required: true },
  espnId: { type: String },
}, { _id: false });

const TeamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  city: { type: String, required: true },
  abbreviation: { type: String, required: true },
  color: { type: String, required: true },
  logo: { type: String, required: true },
}, { _id: false });

const GameSchema = new Schema<IGame>({
  title: { type: String, required: true },
  homeTeam: { type: TeamSchema, required: true },
  awayTeam: { type: TeamSchema, required: true },
  homeRoster: [RosterPlayerSchema],
  awayRoster: [RosterPlayerSchema],
  frames: [GameFrameSchema],
  frameInterval: { type: Number, default: 15 },
  totalDuration: { type: Number, default: 600 },
  status: { type: String, enum: ['upcoming', 'live', 'completed'], default: 'upcoming' },
  createdAt: { type: Date, default: Date.now },
});

export const Game = mongoose.model<IGame>('Game', GameSchema);

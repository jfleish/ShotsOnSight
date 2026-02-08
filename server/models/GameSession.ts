import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IPlayerState {
  playerId: string;
  name: string;
  team: 'home' | 'away';
  mode: 'casual' | 'savage' | 'dd';
  beerBrand: string;
  focusedOn: string;
  sips: number;
  shots: number;
  shotguns: number;
  lastDrinkTime: number;
  lastShotTime: number;
  lastShotgunTime: number;
}

export interface IGameSession extends Document {
  gameId: Types.ObjectId;
  status: 'waiting' | 'playing' | 'paused' | 'finished';
  currentFrame: number;
  elapsedTime: number;
  players: IPlayerState[];
  createdAt: Date;
  startedAt?: Date;
  finishedAt?: Date;
}

const PlayerStateSchema = new Schema<IPlayerState>({
  playerId: { type: String, required: true },
  name: { type: String, required: true },
  team: { type: String, enum: ['home', 'away'], required: true },
  mode: { type: String, enum: ['casual', 'savage', 'dd'], required: true },
  beerBrand: { type: String, default: 'Bud Light' },
  focusedOn: { type: String, default: 'None' },
  sips: { type: Number, default: 0 },
  shots: { type: Number, default: 0 },
  shotguns: { type: Number, default: 0 },
  lastDrinkTime: { type: Number, default: 0 },
  lastShotTime: { type: Number, default: 0 },
  lastShotgunTime: { type: Number, default: 0 },
}, { _id: false });

const GameSessionSchema = new Schema<IGameSession>({
  gameId: { type: Schema.Types.ObjectId, ref: 'Game', required: true },
  status: { type: String, enum: ['waiting', 'playing', 'paused', 'finished'], default: 'waiting' },
  currentFrame: { type: Number, default: 0 },
  elapsedTime: { type: Number, default: 0 },
  players: [PlayerStateSchema],
  createdAt: { type: Date, default: Date.now },
  startedAt: { type: Date },
  finishedAt: { type: Date },
});

export const GameSession = mongoose.model<IGameSession>('GameSession', GameSessionSchema);

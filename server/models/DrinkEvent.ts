import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IDrinkEvent extends Document {
  sessionId: Types.ObjectId;
  playerId: string;
  playerName: string;
  team: 'home' | 'away';
  drinkType: 'sip' | 'shot' | 'shotgun';
  reason: string;
  gameEvent: string | null;
  frameIndex: number;
  winProbDelta: number;
  timestamp: number;
  createdAt: Date;
}

const DrinkEventSchema = new Schema<IDrinkEvent>({
  sessionId: { type: Schema.Types.ObjectId, ref: 'GameSession', required: true },
  playerId: { type: String, required: true },
  playerName: { type: String, required: true },
  team: { type: String, enum: ['home', 'away'], required: true },
  drinkType: { type: String, enum: ['sip', 'shot', 'shotgun'], required: true },
  reason: { type: String, required: true },
  gameEvent: { type: String, default: null },
  frameIndex: { type: Number, required: true },
  winProbDelta: { type: Number, default: 0 },
  timestamp: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

DrinkEventSchema.index({ sessionId: 1 });
DrinkEventSchema.index({ sessionId: 1, playerId: 1 });

export const DrinkEvent = mongoose.model<IDrinkEvent>('DrinkEvent', DrinkEventSchema);

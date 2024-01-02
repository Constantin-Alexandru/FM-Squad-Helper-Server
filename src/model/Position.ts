import mongoose, { Schema } from 'mongoose';

export interface PositionsInterface {
  id: string;
  name: string;
  rolesIds: Array<string>;
}

export interface PositionsModel extends PositionsInterface, Document {}

const PositionsSchema: Schema = new Schema(
  {
    id: { type: String, require: true },
    name: { type: String, require: true },
    rolesIds: { type: Array<string>, require: true, ref: 'PlayerRoles' },
  },
  { versionKey: false }
);

export default mongoose.model<PositionsModel>('Positions', PositionsSchema);

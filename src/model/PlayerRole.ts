import mongoose, { Schema } from 'mongoose';

export interface PlayerRoleInterface {
  id: string;
  name: string;
}

export interface PlayerRoleModel extends PlayerRoleInterface, Document {}

const PlayerRoleSchema: Schema = new Schema(
  {
    id: { type: String, require: true },
    name: { type: String, require: true },
  },
  { versionKey: false }
);

export default mongoose.model<PlayerRoleModel>('PlayerRoles', PlayerRoleSchema);

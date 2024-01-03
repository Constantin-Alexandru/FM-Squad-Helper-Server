import mongoose, { Schema } from 'mongoose';

export interface StatusInterface {
  id: string;
  name: string;
  color: string;
}

export interface StatusModel extends StatusInterface, Document {}

const StatusSchema: Schema = new Schema(
  {
    id: { type: String, unique: true, require: true },
    name: { type: String, require: true },
    color: { type: String, require: true },
  },
  { versionKey: false }
);

export default mongoose.model<StatusModel>('Status', StatusSchema);

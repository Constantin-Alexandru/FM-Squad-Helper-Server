import mongoose, { Schema } from 'mongoose';

export interface AttributeInterface {
  id: string;
  position: number;
  name: string;
}

export interface AttributeModel extends AttributeInterface, Document {}

const AttributeSchema: Schema = new Schema(
  {
    id: { type: String, unique: true, require: true },
    position: { type: Number, unique: true, require: true },
    name: { type: String, require: true },
  },
  { versionKey: false }
);

export default mongoose.model<AttributeModel>('Attributes', AttributeSchema);

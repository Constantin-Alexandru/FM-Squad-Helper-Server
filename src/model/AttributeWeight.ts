import mongoose, { Schema } from 'mongoose';

export interface AttributeWeightInterface {
  roleId: string;
  attributeId: string;
  weight: number;
}

export interface AttributeWeightModel
  extends AttributeWeightInterface,
    Document {}

const AttributeWeightSchema: Schema = new Schema(
  {
    roleId: { type: String, require: true, ref: 'PlayerRoles' },
    attributeId: { type: String, require: true, ref: 'Attributes' },
    weight: { type: Number, require: true },
  },
  { versionKey: false }
);

export default mongoose.model<AttributeWeightModel>(
  'AttributeWeights',
  AttributeWeightSchema
);

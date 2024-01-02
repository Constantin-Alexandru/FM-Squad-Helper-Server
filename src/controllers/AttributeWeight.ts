import { error } from 'console';
import Logging from '../libraries/Logging';
import AttributeWeight, {
  AttributeWeightInterface,
} from '../model/AttributeWeight';

export function createAttributeWeight(
  roleId: string,
  attributeId: string,
  weight: number
): void {
  const attributeWeight = new AttributeWeight({
    roleId,
    attributeId,
    weight,
  });

  attributeWeight
    .save()
    .then()
    .catch((error) => {
      Logging.error(error);
    });
}

export async function getAllAttributeWeights(): Promise<
  Array<AttributeWeightInterface>
> {
  return await AttributeWeight.find().then();
}

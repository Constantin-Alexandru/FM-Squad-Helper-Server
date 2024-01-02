import Logging from '../libraries/Logging';
import Attribute, { AttributeInterface } from '../model/Attribute';

export function createAttribute(
  id: string,
  position: number,
  name: string
): void {
  const attribute = new Attribute({ id, position, name });

  attribute.save().then().catch(Logging.error);
}

export async function getAllAttributes(): Promise<Array<AttributeInterface>> {
  return await Attribute.find().then((attributes) => {
    return attributes.sort((a, b) => {
      return a.position - b.position;
    });
  });
}

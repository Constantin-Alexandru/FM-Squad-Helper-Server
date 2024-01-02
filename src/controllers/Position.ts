import Logging from '../libraries/Logging';
import Position, { PositionsInterface } from '../model/Position';

export function createPosition(
  id: string,
  name: string,
  rolesIds: Array<string>
) {
  const position = new Position({ id, name, rolesIds });

  position.save().then().catch(Logging.error);
}

export async function getAllPositions(): Promise<Array<PositionsInterface>> {
  return Position.find().then();
}

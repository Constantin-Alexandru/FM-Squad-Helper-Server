import Logging from '../libraries/Logging';
import PlayerRole, { PlayerRoleInterface } from '../model/PlayerRole';

export function createPlayerRole(id: string, name: string): void {
  const playerRole = new PlayerRole({ id, name });

  playerRole
    .save()
    .then()
    .catch((error) => {
      Logging.error(error);
    });
}

export async function getAllPlayerRoles(): Promise<Array<PlayerRoleInterface>> {
  return await PlayerRole.find().then();
}

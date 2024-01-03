import Logging from '../libraries/Logging';
import Status, { StatusInterface } from '../model/Status';

export function createStatus(id: string, name: string, color: string) {
  const status = new Status({ id, name, color });

  status.save().then().catch(Logging.error);
}

export async function getAllStatus(): Promise<Array<StatusInterface>> {
  return await Status.find().then();
}

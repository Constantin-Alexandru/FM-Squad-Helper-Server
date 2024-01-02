import mongoose from 'mongoose';

export async function collectionExists(
  collectionName: string
): Promise<boolean> {
  const connections = await mongoose.connection.db.listCollections().toArray();
  const matchingConnection: mongoose.mongo.CollectionInfo | undefined =
    connections.find((collection) => collection.name == collectionName);

  if (!matchingConnection) return false;

  const collection = await mongoose.connection.db.collection(
    matchingConnection.name
  );
  const count: number = await collection.countDocuments();

  return count != 0;
}

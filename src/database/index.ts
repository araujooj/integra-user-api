import { Connection, createConnections } from 'typeorm';

export default async (name = 'default'): Promise<Connection[]> => {
  return createConnections();
};

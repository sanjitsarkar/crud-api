import { createClient } from 'redis';

const redisClient = createClient();

// eslint-disable-next-line no-console
redisClient.on('error', (err) => console.error('Redis Client Error', err));
export default redisClient;

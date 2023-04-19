import redisClient from '../../config/redis';

class CacheService {
  async getData(key: string) {
    return await redisClient.get(key)
  }
  async setData(key: string, data: any) {
    return await redisClient.set(key, data)
  }
  async removeData(key: string) {
    await redisClient.del(key)
  }
}

export default new CacheService()
import { NextFunction, Request, Response } from 'express';
import cacheService from '../services/cache.service';
export const cachePosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cachedPosts = await cacheService.getData('posts');
    if (cachedPosts) {
      const posts = JSON.parse(cachedPosts);
      res.send({
        fromCache: true,
        data: posts,
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(404);
  }
}

export const removePostsCache = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await cacheService.removeData('posts');
    next();
  } catch (error) {
    res.status(404);
  }
}

import { Request, Response } from 'express';
import PostService from '../services/post.service';
import cacheService from '../services/cache.service';
export const createPost = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const post = await PostService.createPost({ title, description, });
  res.json({
    data: post,
  });

};

export const updatePost = async (req: Request, res: Response) => {
  const { id, title, description } = req.body;
  const post = await PostService.findByIdAndUpdate(id, { title, description, });
  res.json({
    data: post,
  });
};
export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await PostService.deletePost({ _id: id });
  res.json({
    data: post,
  });
};

export const fetchPosts = async (req: Request, res: Response) => {
  const posts = await PostService.findPosts({});
  cacheService.setData('posts', JSON.stringify(posts))
  res.json({
    fromCache: false,
    data: posts,
  });
};
export const fetchPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await PostService.findPost({ _id: id });
  res.json({
    post,
  });
};

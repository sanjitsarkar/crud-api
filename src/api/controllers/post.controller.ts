import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { cacheService, postService } from '../services';
export const createPost = async (req: Request, res: Response) => {
  const { title, description, author } = req.body;
  const post = await postService.createPost({ title, description, author });
  res.json({
    data: post,
  });

};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params
  const { title, description } = req.body;
  const post = await postService.updatePostById(new Types.ObjectId(id), { title, description });
  res.json({
    data: post,
  });
};
export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await postService.deletePostById(new Types.ObjectId(id));
  res.json({
    data: post,
  });
};


export const fetchPosts = async (req: Request, res: Response) => {
  const { search = '', limit = 15, skip = 0 } = req.query
  const posts = await postService.findPosts(Number(limit), Number(skip), String(search));
  if (!search && Number(limit) === 15 && !Number(skip)) {
    cacheService.setData('posts', JSON.stringify(posts))
  }
  res.json({
    fromCache: false,
    data: posts,
  });
};
export const fetchPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await postService.findPostById({ _id: id });
  res.json({
    data: post,
  });
};

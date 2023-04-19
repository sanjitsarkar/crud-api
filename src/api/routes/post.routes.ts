import express from 'express';
import { createPost, deletePost, fetchPost, fetchPosts, updatePost } from '../controllers/post.controller';
import { createPostValidationRules, fetchDeletePostValidationRules, updatePostValidationRules, validate } from '../utils';
import { cachePosts, removePostsCache } from '../middlewares';


const router = express.Router();
router.get('/', cachePosts, fetchPosts)
router.get('/:id', fetchDeletePostValidationRules(), validate, fetchPost)
router.post('/', createPostValidationRules(), validate, removePostsCache, createPost)
router.put('/:id', updatePostValidationRules(), validate, removePostsCache, updatePost);
router.delete('/:id', fetchDeletePostValidationRules(), validate, removePostsCache, deletePost);

export const postRoutes = router;
export default postRoutes
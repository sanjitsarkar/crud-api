import express from 'express';
import { createPost, deletePost, fetchPost, fetchPosts, updatePost } from '../controllers/post.controller';
import { cachePosts, removePostsCache } from '../middlewares';
import { createPostValidationRules, fetchDeletePostValidationRules, updatePostValidationRules } from '../utils';


const router = express.Router();
router.get('/', cachePosts, fetchPosts)
router.get('/:id', fetchDeletePostValidationRules, fetchPost)
router.post('/', createPostValidationRules, removePostsCache, createPost)
router.patch('/:id', updatePostValidationRules, removePostsCache, updatePost);
router.delete('/:id', fetchDeletePostValidationRules, removePostsCache, deletePost);

export const postRoutes = router;
export default postRoutes
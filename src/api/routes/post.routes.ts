import express from 'express';
import { createPost, deletePost, fetchPost, fetchPosts, updatePost } from '../controllers/post.controller';
import { cachePosts, removePostsCache } from '../middlewares';
import { createPostValidationRules, fetchDeletePostValidationRules, updatePostValidationRules, validate } from '../utils';


const router = express.Router();
router.get('/', cachePosts, fetchPosts)
router.get('/:id', [...fetchDeletePostValidationRules], validate, fetchPost)
router.post('/', [...createPostValidationRules], validate, removePostsCache, createPost)
router.patch('/:id', [...updatePostValidationRules], validate, removePostsCache, updatePost);
router.delete('/:id', [...fetchDeletePostValidationRules], validate, removePostsCache, deletePost);

export const postRoutes = router;
export default postRoutes
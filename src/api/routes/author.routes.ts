import express from 'express';
import { createAuthor, deleteAuthor, fetchAuthor, fetchAuthors, updateAuthor } from '../controllers/author.controller';
import { createAuthorValidationRules, fetchDeleteAuthorValidationRules, updateAuthorValidationRules, validate } from '../utils';


const router = express.Router();
router.get('/', fetchAuthors)
router.get('/:id', [...fetchDeleteAuthorValidationRules], validate, fetchAuthor)
router.post('/', [...createAuthorValidationRules], validate, createAuthor)
router.patch('/:id', [...updateAuthorValidationRules], validate, updateAuthor);
router.delete('/:id', [...fetchDeleteAuthorValidationRules], validate, deleteAuthor);

export const authorRoutes = router;
export default authorRoutes
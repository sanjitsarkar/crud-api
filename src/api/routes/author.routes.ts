import express from 'express';
import { createAuthor, deleteAuthor, fetchAuthor, fetchAuthors, updateAuthor } from '../controllers/author.controller';
import { createAuthorValidationRules, fetchDeleteAuthorValidationRules, updateAuthorValidationRules } from '../utils';


const router = express.Router();
router.get('/', fetchAuthors)
router.get('/:id', [...fetchDeleteAuthorValidationRules], fetchAuthor)
router.post('/', [...createAuthorValidationRules], createAuthor)
router.patch('/:id', [...updateAuthorValidationRules], updateAuthor);
router.delete('/:id', [...fetchDeleteAuthorValidationRules], deleteAuthor);

export const authorRoutes = router;
export default authorRoutes
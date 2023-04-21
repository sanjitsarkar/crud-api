import { NextFunction, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
export const createPostValidationRules = [
  body('title').isString(),
  body('description').isString(),
  body('author').isMongoId(),
]
export const updatePostValidationRules = [
  param('id').isMongoId(),
  body('title').isString(),
  body('description').isString(),
  body('author').isMongoId(),
]
export const fetchDeletePostValidationRules = [
  param('id').isMongoId(),
]
export const createAuthorValidationRules = [
  body('name').isString(),
  body('username').isString(),
]
export const updateAuthorValidationRules = [
  param('id').isMongoId(),
  body('name').isString(),
  body('username').isString(),
]
export const fetchDeleteAuthorValidationRules = [
  param('id').isMongoId(),
]
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    return next()
  } else {
    return res.status(400).json({
      errors: errors.array()
    })
  }
}
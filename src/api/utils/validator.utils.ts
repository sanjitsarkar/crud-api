import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    return next()
  } else {
    return res.status(400).json({
      errors: errors.array().map((each => each.msg))
    })
  }
}
export const createPostValidationRules = [
  check('title', 'title can\'t be empty').notEmpty(),
  check('description', 'description can\'t be empty').notEmpty(),
  check('author', 'author is invalid').isMongoId(),
  validate
]
export const updatePostValidationRules = [
  check('id', 'postId is invalid').isMongoId(),
  check('title', 'title can\'t be empty').notEmpty(),
  check('description', 'description can\'t be empty').notEmpty(),
  check('author', 'author is invalid').isMongoId(),
  validate
]
export const fetchDeletePostValidationRules = [
  check('id', 'postId is invalid').isMongoId(),
  validate
]
export const createAuthorValidationRules = [
  check('name', 'name can\'t be empty').notEmpty(),
  check('username', 'username can\'t be empty').notEmpty(),
  validate
]
export const updateAuthorValidationRules = [
  check('id', 'postId is invalid').isMongoId(),
  check('name', 'name can\'t be empty').notEmpty(),
  check('username', 'username can\'t be empty').notEmpty(),
  validate
]
export const fetchDeleteAuthorValidationRules = [
  check('id', 'postId is invalid').isMongoId(),
  validate
]

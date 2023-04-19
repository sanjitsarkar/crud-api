import { NextFunction, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
export const createPostValidationRules = () => {
  return [
    body('title').isString(),
    body('description').isString(),
  ]
}
export const updatePostValidationRules = () => {
  return [
    param('id').isMongoId(),
    body('title').isString(),
    body('description').isString(),
  ]
}
export const fetchDeletePostValidationRules = () => {
  return [
    param('id').isMongoId(),
  ]
}
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors: Record<string, unknown>[] = []
  errors.array().map(err => extractedErrors.push({ [err.type]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { authorService } from '../services';
export const createAuthor = async (req: Request, res: Response) => {
  const { name, username } = req.body;
  const author = await authorService.createAuthor({ name, username, });
  res.json({
    data: author,
  });

};

export const updateAuthor = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, username } = req.body;
  const author = await authorService.updateAuthorById(new Types.ObjectId(id), { name, username });
  res.json({
    data: author,
  });
};
export const deleteAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const author = await authorService.deleteAuthorById(new Types.ObjectId(id));
  res.json({
    data: author,
  });
};

export const fetchAuthors = async (req: Request, res: Response) => {
  const { search = '', limit = 15, skip = 0 } = req.query
  const authors = await authorService.findAuthors(Number(limit), Number(skip), String(search));
  res.json({
    fromCache: false,
    data: authors,
  });
};
export const fetchAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const author = await authorService.findAuthorById({ _id: id });
  res.json({
    author,
  });
};

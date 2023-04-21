import { FilterQuery } from 'mongoose';
import { AuthorDocument, AuthorInput, AuthorModel } from '../models';

class AuthorService {
  async createAuthor(input: AuthorInput) {
    const result = await AuthorModel.create(input);
    return result;
  }

  async findAuthorById(
    id: Pick<FilterQuery<AuthorDocument>, '_id'>
  ) {
    const result = await AuthorModel.findById(id);
    return result;

  }
  async findAuthors(limit: number, skip: number, search?: string,) {

    const result = await AuthorModel.aggregate([{
      $match: {
        ...(search && { $or: [{ name: { $regex: search, $options: 'i' } }, { username: { $regex: search, $options: 'i' } }] })
      },
    },
    {
      $skip: skip
    }, {
      $limit: limit
    }]);
    return result;
  }

  async updateAuthorById(
    id: Pick<FilterQuery<AuthorDocument>, '_id'>,
    data: Partial<AuthorDocument>
  ) {
    return AuthorModel.findByIdAndUpdate(id, { $set: data }, { new: true });
  }

  async deleteAuthorById(id: Pick<FilterQuery<AuthorDocument>, '_id'>) {
    return AuthorModel.findByIdAndDelete(id);
  }
}

export default new AuthorService()
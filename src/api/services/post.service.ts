import { FilterQuery } from 'mongoose';
import { PostDocument, PostInput, PostModel } from '../models';

class PostService {
  async createPost(input: PostInput) {
    const result = await PostModel.create(input);
    return result;
  }

  async findPostById(
    id: Pick<FilterQuery<PostDocument>, '_id'>
  ) {
    const result = await PostModel.findById(id).populate('author');
    return result;

  }
  async findPosts(limit: number, skip: number, search?: string,) {

    const result = await PostModel.aggregate([{
      $match: {
        ...(search && { $or: [{ title: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }] })
      },
    },
    {
      $lookup: {
        localField: 'author',
        foreignField: '_id',
        as: 'author',
        from: 'authors'
      }
    },
    {
      $unwind: {
        path: '$author',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $skip: skip
    }, {
      $limit: limit
    }]);
    return result;
  }

  async updatePostById(
    id: Pick<FilterQuery<PostDocument>, '_id'>,
    data: Partial<PostDocument>
  ) {
    return PostModel.findByIdAndUpdate(id, { $set: data }, { new: true });
  }

  async deletePostById(id: Pick<FilterQuery<PostDocument>, '_id'>) {
    return PostModel.findByIdAndDelete(id);
  }
}

export default new PostService()
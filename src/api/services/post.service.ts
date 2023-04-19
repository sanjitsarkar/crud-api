import { FilterQuery, ProjectionFields, QueryOptions, UpdateQuery } from 'mongoose';
import { PostDocument, PostInput, PostModel } from '../models';

class PostService {
  async createPost(input: PostInput) {
    const result = await PostModel.create(input);
    return result;
  }

  async findPost(
    query: FilterQuery<PostDocument>,
    projections: ProjectionFields<PostDocument> = {},
    options: QueryOptions = { lean: true }
  ) {
    const result = await PostModel.findOne(query, projections, options);
    return result;

  }
  async findPosts(
    query: FilterQuery<PostDocument>,
    projections: ProjectionFields<PostDocument> = {},
    options: QueryOptions = { lean: true, }
  ) {

    const result = await PostModel.find(query, projections, options);
    return result;
  }

  async findAndUpdatePost(
    query: FilterQuery<PostDocument>,
    update: UpdateQuery<PostDocument>,
    options?: QueryOptions
  ) {
    return PostModel.findOneAndUpdate(query, update, options);
  }
  async findByIdAndUpdate(
    id: Pick<FilterQuery<PostDocument>, '_id'>,
    update: UpdateQuery<PostDocument>,
    options?: QueryOptions
  ) {
    return PostModel.findByIdAndUpdate(id, update, options);
  }

  async deletePost(query: FilterQuery<PostDocument>) {
    return PostModel.deleteOne(query);
  }

  async findAndDeletePostById(id: Pick<FilterQuery<PostDocument>, '_id'>,
  ) {
    return PostModel.findByIdAndDelete(id);
  }
}

export default new PostService()
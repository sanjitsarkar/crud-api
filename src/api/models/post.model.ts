import { Document, Schema, Types, model } from 'mongoose';

export interface PostInput {
  title: string,
  description: string,
  author: string
}

export interface PostDocument extends PostInput, Document {
  createdAt: Date,
  updatedAt: Date
}

const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Post title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Post description is required'],
    trim: true,
  },
  author: {
    type: Types.ObjectId,
    required: [true, 'Author is required'],
    ref: 'author'
  }
}, {
  timestamps: true,

})


export const PostModel = model<PostDocument>('Post', PostSchema)


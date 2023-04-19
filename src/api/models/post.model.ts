import { Document, Schema, model } from 'mongoose';

export interface PostInput {
  title: string,
  description: string
}

export interface PostDocument extends PostInput, Document {
  createdAt: Date,
  updatedAt: Date
}

const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Post title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Post description is required'],
    trim: true,
  }
}, {
  timestamps: true
})


export const PostModel = model<PostDocument>('Post', PostSchema)


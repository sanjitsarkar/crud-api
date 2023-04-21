import { Document, Schema, model } from 'mongoose';

export interface AuthorInput {
  name: string,
  username: string
}

export interface AuthorDocument extends AuthorInput, Document {
  createdAt: Date,
  updatedAt: Date
}

const AuthorSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true,
  },
  username: {
    type: String,
    required: [true, 'User name is required'],
    trim: true,
    unique: true
  }
}, {
  timestamps: true,

})


export const AuthorModel = model<AuthorDocument>('author', AuthorSchema)


import mongoose from 'mongoose'
import { Books } from './Book'

export interface Users extends mongoose.Document {
  username: string
  password: string
  books: Books[]
}

const UserSchema = new mongoose.Schema<Users>(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  },
  { timestamps: true, versionKey: false }
)

export default mongoose.models.User || mongoose.model<Users>('User', UserSchema)

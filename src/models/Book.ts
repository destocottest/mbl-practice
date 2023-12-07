import mongoose from 'mongoose'

export interface Books extends mongoose.Document {
  volume_id: string
  title: string
  author?: string
  cover?: string
}

const BookSchema = new mongoose.Schema<Books>(
  {
    volume_id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: String,
    cover: String,
  },
  { versionKey: false }
)

export default mongoose.models.Book || mongoose.model<Books>('Book', BookSchema)

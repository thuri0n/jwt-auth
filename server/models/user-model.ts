import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
  email: string
  password: string
  isActivated: boolean
  activationLink: string
}

const UserSchema = new Schema<IUser>( {
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String, required: true }
})

export const UserModel = model('User', UserSchema)

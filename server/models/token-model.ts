import { Schema, model } from 'mongoose'

export interface IToken {
  user: unknown
  refreshToken: string
}

const TokenSchema = new Schema<IToken>( {
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true }
})

export default model('Token', TokenSchema)

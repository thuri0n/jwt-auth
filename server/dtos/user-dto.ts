import { IUser } from '../models/user-model';
import { Types } from 'mongoose';

export interface UserDto {
  email: string
  id: Types.ObjectId,
  isActivated: boolean
}

export class UserDto {
  constructor( model: IUser ) {
    this.email = model.email
    this.id = model._id
    this.isActivated = model.isActivated
  }
}

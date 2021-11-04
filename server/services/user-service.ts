import { IUser, UserModel } from '../models/user-model';
import * as bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid'
import mailService from '../services/mail-service'
import tokenService from '../services/token-service'
import { UserDto } from '../dtos/user-dto';


class UserService {
  async  registration(email: string, password: string) {
    const candidate: IUser = await UserModel.findOne({ email })
    if(candidate) {
      throw  new Error(`Пользователь с адресом ${email} уже существует`)
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuidV4()
    const user = await UserModel.create({email, hashPassword, activationLink})
    await mailService.sendActivationMail(email, activationLink)

    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})
    await  tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }
}

export const userService = new UserService()

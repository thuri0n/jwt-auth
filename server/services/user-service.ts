import { IUser, UserModel } from '../models/user-model';
import * as bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid'
import tokenService from '../services/token-service'
import { UserDto } from '../dtos/user-dto';
import { mailService } from './mail-service';


class UserService {
  async registration(email: string, password: string) {
    const candidate: IUser = await UserModel.findOne({ email })
    if(candidate) {
      throw  new Error(`Пользователь с адресом ${email} уже существует`)
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuidV4()
    const user = await UserModel.create({email, password: hashPassword, activationLink})
    await mailService.sendActivationMail(email, `${process.env.API_URL}:${process.env.PORT}/api/activate/${activationLink}`)

    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})
    await  tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }

  async activate(activationLink: IUser['activationLink']) {
    const user = await UserModel.findOne({ activationLink })
    if(!user) {
      throw new Error('некоректная ссылка активации')
    }
    user.isActivated = true
    user.save()
  }
}

export const userService = new UserService()

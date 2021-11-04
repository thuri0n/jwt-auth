import * as jwt from 'jsonwebtoken'
import tokenModel from '../models/token-model';
import { UserDto } from '../dtos/user-dto';
import { Types } from 'mongoose';

class TokenService {
  generateTokens( payload: UserDto ): {
    accessToken: string
    refreshToken: string
  } {
    const accessToken = jwt.sign( payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' } );
    const refreshToken = jwt.sign( payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' } );

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken( userId: Types.ObjectId, refreshToken: string) {
    const tokenData = await tokenModel.findOne({ user: userId })
    if(tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }
    return  tokenModel.create({user: userId, refreshToken})
  }
}

export default new TokenService()

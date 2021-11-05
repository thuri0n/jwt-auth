import { Request, Response, NextFunction } from 'express'
import { userService } from '../services/user-service';

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body
      const userData = await userService.registration(email, password)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30* 24 * 60 * 50 * 1000,
        httpOnly: true
      })
      return res.json(userData)
    } catch (e) {
      
    }
  }
  
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      
    } catch (e) {
      
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (e) {

    }
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const activationLink = req.params.link
      await userService.activate(activationLink)
      return res.redirect(process.env.CLIENT_URL)
    } catch (e) {
      console.log(e);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (e) {

    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(['123,', '321'])
    } catch (e) {

    }
  }
}

export const userController = new UserController()

import { Router } from 'express';
import { userController } from '../controllers/user-controller'

console.log(process.env);
const router = Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link')
router.get('/refresh', userController.refresh)
router.get('/users', userController.getUsers)

export default router

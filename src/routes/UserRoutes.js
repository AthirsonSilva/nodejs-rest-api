import { Router } from 'express'
import userController from '../controllers/UserController'

const router = Router()

// CRUD routes
router.post('/', userController.store)
router.get('/', userController.index)
router.get('/:id', userController.show)
router.patch('/:id', userController.update)
router.delete('/:id', userController.delete)

export default router

import { Router } from 'express'
import userController from '../controllers/UserController'

import authRequired from '../middlewares/authRequired'

const router = Router()

// CRUD routes
router.get('/', authRequired, userController.index)
router.post('/', userController.store)
router.get('/:id', userController.show)
router.patch('/:id', userController.update)
router.delete('/:id', userController.delete)

export default router

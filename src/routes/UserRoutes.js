import { Router } from 'express'
import userController from '../controllers/UserController'

import authRequired from '../middlewares/authRequired'

const router = Router()

// CRUD routes
router.get('/', userController.index)
router.get('/show', authRequired, userController.show)

router.post('/', userController.store)
router.patch('/', authRequired, userController.update)
router.delete('/', authRequired, userController.delete)

export default router

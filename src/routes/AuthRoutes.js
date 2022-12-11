import { Router } from 'express'
import authController from '../controllers/AuthController'

const router = Router()

router.get('/', authController.index)
router.post('/', authController.store)

export default router

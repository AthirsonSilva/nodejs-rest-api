import { Router } from 'express'
import studentController from '../controllers/StudentController'

const router = Router()

router.get('/', studentController.index)

export default router

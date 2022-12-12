import { Router } from 'express'
import studentPhotoController from '../controllers/StudentPhotoController'
import authRequired from '../middlewares/authRequired'

const router = Router()

router.post('/:id', authRequired, studentPhotoController.store)

export default router

import { Router } from 'express'
import filesController from '../controllers/FileController'

const router = Router()

router.post('/', filesController.store)

export default router

import { Router } from 'express'
import multer from 'multer'
import multerConfig from '../config/multerConfig'
import filesController from '../controllers/FileController'

const upload = multer(multerConfig)

const router = Router()

router.post('/', upload.single('photo'), filesController.store)

export default router

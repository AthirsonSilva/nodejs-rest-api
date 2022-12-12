import { Router } from 'express'
import studentController from '../controllers/StudentController'

import authRequired from '../middlewares/authRequired'

const router = Router()

router.get('/', studentController.index)
router.post('/', authRequired, studentController.store)
router.get('/:id', studentController.show)
router.patch('/:id', authRequired, studentController.update)
router.delete('/:id', authRequired, studentController.delete)

export default router

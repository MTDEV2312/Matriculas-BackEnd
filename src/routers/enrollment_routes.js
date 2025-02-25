import {Router} from 'express'
import {RegisterEnrollment,GetEnrollments,GetEnrollmentsById,UpdateEnrollment,DeleteEnrollment} from '../controllers/enrollment_controller.js'

const router = Router()

router.post('/enrollment/register',RegisterEnrollment)
router.get('/enrollment',GetEnrollments)
router.get('/enrollment/:codigo',GetEnrollmentsById)
router.patch('/enrollment/update/:id',UpdateEnrollment)
router.delete('/enrollment/delete/:id',DeleteEnrollment)

export default router

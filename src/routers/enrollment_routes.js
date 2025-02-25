import {Router} from 'express'
import {RegisterEnrollment,GetEnrollments,GetEnrollmentsById,UpdateEnrollment,DeleteEnrollment} from '../controllers/enrollment_controller.js'
import {verifyJwt} from '../middlewares/jwt.js'
const router = Router()

router.post('/enrollment/register',verifyJwt,RegisterEnrollment)
router.get('/enrollment',verifyJwt,GetEnrollments)
router.get('/enrollment/:codigo',verifyJwt,GetEnrollmentsById)
router.patch('/enrollment/update/:id',verifyJwt,UpdateEnrollment)
router.delete('/enrollment/delete/:id',verifyJwt,DeleteEnrollment)

export default router

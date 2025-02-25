import {Router} from 'express'
import {RegisterEnrollment,GetEnrollments,GetEnrollmentsById,UpdateEnrollment,DeleteEnrollment} from '../controllers/enrollment_controller.js'
import {verifyJwt} from '../middlewares/jwt.js'
import {validateRequest} from '../middlewares/middleware_validation.js'
import {RegisterEnrollValidator,GetEnrollByIdValidator,UpdateEnrollValidator,DeleteEnrollValidator} from '../helpers/enrollment_validation.js'

const router = Router()

router.post('/enrollment/register',verifyJwt,RegisterEnrollValidator,validateRequest,RegisterEnrollment)
router.get('/enrollment',verifyJwt,GetEnrollments)
router.get('/enrollment/:codigo',verifyJwt,GetEnrollByIdValidator,validateRequest,GetEnrollmentsById)
router.patch('/enrollment/update/:id',verifyJwt,UpdateEnrollValidator,validateRequest,UpdateEnrollment)
router.delete('/enrollment/delete/:id',verifyJwt,DeleteEnrollValidator,validateRequest,DeleteEnrollment)

export default router

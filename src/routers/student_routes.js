import {Router} from 'express'
import {RegisterStudent,GetStudentById,GetStudents,UpdateStudent,DeleteStudent} from '../controllers/students_controller.js'
import {verifyJwt} from '../middlewares/jwt.js'
import {validateRequest} from '../middlewares/middleware_validation.js'
import {RegisterStudentValidator,GetStudentByIdValidator,UpdateStudentValidator,DeleteStudentValidator} from '../helpers/student_validation.js'

const router = Router()

router.post('/students/register',verifyJwt,RegisterStudentValidator,validateRequest,RegisterStudent)
router.get('/students/',verifyJwt,GetStudents)
router.get('/students/:codigo',verifyJwt,GetStudentByIdValidator,validateRequest,GetStudentById)
router.patch('/students/update/:id',verifyJwt,UpdateStudentValidator,validateRequest,UpdateStudent)
router.delete('/students/delete/:id',verifyJwt,DeleteStudentValidator,validateRequest,DeleteStudent)

export default router
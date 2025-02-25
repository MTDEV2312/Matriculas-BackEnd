import {Router} from 'express'
import {RegisterStudent,GetStudentById,GetStudents,UpdateStudent,DeleteStudent} from '../controllers/students_controller.js'
import {verifyJwt} from '../middlewares/jwt.js'
const router = Router()

router.post('/students/register',verifyJwt,RegisterStudent)
router.get('/students/',verifyJwt,GetStudents)
router.get('/students/:codigo',verifyJwt,GetStudentById)
router.patch('/students/update/:id',verifyJwt,UpdateStudent)
router.delete('/students/delete/:id',verifyJwt,DeleteStudent)

export default router
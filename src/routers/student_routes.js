import {Router} from 'express'
import {RegisterStudent,GetStudentById,GetStudents,UpdateStudent,DeleteStudent} from '../controllers/students_controller.js'

const router = Router()

router.post('/students/register',RegisterStudent)
router.get('/students/',GetStudents)
router.get('/students/:codigo',GetStudentById)
router.patch('/students/update/:id',UpdateStudent)
router.delete('/students/delete/:id',DeleteStudent)

export default router
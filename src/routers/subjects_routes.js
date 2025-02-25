import {Router} from 'express'
import {RegisterSubject,GetSubjectById,GetSubjects,UpdateSubject,DeleteSubject} from '../controllers/subjects_controller.js'

const router = Router()

router.post('/subjects/register',RegisterSubject)
router.get('/subjects/',GetSubjects)
router.get('/subjects/:codigo',GetSubjectById)
router.patch('/subjects/update/:id',UpdateSubject)
router.delete('/subjects/delete/:id',DeleteSubject)

export default router
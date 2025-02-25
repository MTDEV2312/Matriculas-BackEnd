import {Router} from 'express'
import {RegisterSubject,GetSubjectById,GetSubjects,UpdateSubject,DeleteSubject} from '../controllers/subjects_controller.js'
import {verifyJwt} from '../middlewares/jwt.js'
import {RegisterSubjectValidator,GetSubjectByIdValidator,UpdateSubjectValidator,DeleteSubjectValidator} from '../helpers/subject_validation.js'
import {validateRequest} from '../middlewares/middleware_validation.js'

const router = Router()

router.post('/subjects/register',verifyJwt,RegisterSubjectValidator,validateRequest,RegisterSubject)
router.get('/subjects/',verifyJwt,GetSubjects)
router.get('/subjects/:codigo',verifyJwt,GetSubjectByIdValidator,validateRequest,GetSubjectById)
router.patch('/subjects/update/:id',verifyJwt,UpdateSubjectValidator,validateRequest,UpdateSubject)
router.delete('/subjects/delete/:id',verifyJwt,DeleteSubjectValidator,validateRequest,DeleteSubject)

export default router
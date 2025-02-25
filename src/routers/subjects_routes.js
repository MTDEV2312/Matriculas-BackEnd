import {Router} from 'express'
import {RegisterSubject,GetSubjectById,GetSubjects,UpdateSubject,DeleteSubject} from '../controllers/subjects_controller.js'
import {verifyJwt} from '../middlewares/jwt.js'
const router = Router()

router.post('/subjects/register',verifyJwt,RegisterSubject)
router.get('/subjects/',verifyJwt,GetSubjects)
router.get('/subjects/:codigo',verifyJwt,GetSubjectById)
router.patch('/subjects/update/:id',verifyJwt,UpdateSubject)
router.delete('/subjects/delete/:id',verifyJwt,DeleteSubject)

export default router
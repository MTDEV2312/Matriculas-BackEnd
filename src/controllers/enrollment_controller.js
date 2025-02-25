import Enrollment from '../models/enrollment_model.js'
import Student from '../models/students_model.js'
import Subject from '../models/subjects_model.js'

const RegisterEnrollment = async (req,res) => {
    try {
        const {codigo,materia,estudiante} =req.body

        const EnrollBDD = await Enrollment.findOne({codigo:codigo})
        if(EnrollBDD){return res.status(400).json({msg:"Matricula existente"})}
        const StudentBDD = await Student.findOne({cedula:estudiante})
        const SubjectBDD = await Subject.findOne({codigo:materia})
        if(!StudentBDD || !SubjectBDD){return res.status(400).json({msg:"Estudiante o materia no estan registrados"})}

        const newEnroll = new Enrollment(req.body)
        await newEnroll.save()
        res.status(201).json({msg:"Matricula registrada existosamente"})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Lo sentimos, algo salio mal"})
    }
}

const GetEnrollments = async (req,res) => {
    try {
        const EnrollBDD = await Enrollment.find()
        const StudentID = [... new Set(EnrollBDD.map(enroll => enroll.estudiante))]
        const SubjectCode = [... new Set(EnrollBDD.map(enroll => enroll.materia).flat())]
        
        const SubjectBDD = await Subject.find({codigo:{$in:SubjectCode}})
        const StudentBDD = await Student.find({cedula:{$in:StudentID}})

        const SubjectMap = SubjectBDD.reduce((map,subject)=>{
            map[subject.codigo]={
                _id:subject.id,
                codigo:subject.codigo,
                nombre:subject.nombre,
                creditos:subject.creditos,
                descripcion:subject.descripcion
            }
            return map
        },{})

        const StudentMap = StudentBDD.reduce((map,student)=>{
            map[student.cedula]={
                _id:student.id,
                cedula:student.cedula,
                nombre:student.nombre,
                apellido:student.apellido,
                email:student.email,
                ciudad:student.ciudad,
                direccion:student.direccion,
                telefono:student.telefono,
                fecha_nacimiento:student.fecha_nacimiento,
            }
            return map
        },{})
        
        const response = EnrollBDD.map(enroll => ({
            _id: enroll.id,
            codigo: enroll.codigo,
            descripcion:enroll.descripcion,
            creditos:enroll.creditos,
            materia: enroll.materia.map(materiaCodigo => SubjectMap[materiaCodigo] || null),
            estudiante: StudentMap[enroll.estudiante] || null
        }))
    
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:'Lo sentimos, algo salio mal'})
    }
}

const GetEnrollmentsById = async(req,res) => {
    try {
        const {codigo}=req.params

        if(!codigo){
            return res.status(400).json({msg: "Lo sentimos, debes proporcionar un codigo"})
        }

        const EnrollBDD = await Enrollment.findOne({codigo:codigo})

        if(!EnrollBDD){
            return res.status(400).json({msg: "Lo sentimos, la matricula no existe"})
        }

        const StudentID = EnrollBDD.estudiante
        const SubjectID = EnrollBDD.materia
        const SubjectBDD = await Subject.find({codigo:{$in:SubjectID}})
        const StudentBDD = await Student.findOne({cedula:StudentID})

        const SubjectDetails = SubjectBDD.map(subject => ({
            _id: subject.id,
            codigo: subject.codigo,
            nombre: subject.nombre,
            creditos: subject.creditos,
            descripcion: subject.descripcion
        }));

        const StudentDetails = StudentBDD ?{
            _id:StudentBDD.id,
            cedula:StudentBDD.cedula,
            nombre:StudentBDD.nombre,
            apellido:StudentBDD.apellido,
            email:StudentBDD.email,
            ciudad:StudentBDD.ciudad,
            direccion:StudentBDD.direccion,
            telefono:StudentBDD.telefono,
            fecha_nacimiento:StudentBDD.fecha_nacimiento,
        }:null

        const EnrollDetail = {
            _id: EnrollBDD.id,
            codigo: EnrollBDD.codigo,
            descripcion:EnrollBDD.descripcion,
            creditos:EnrollBDD.creditos,
            materia: SubjectDetails,
            estudiante: StudentDetails
        }
        return res.status(200).json(EnrollDetail)
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Lo sentimos, algo salio mal"})
    }
}

const UpdateEnrollment = async(req,res) => {
    try {
        const {id} = req.params
        const updates = req.body
    
        if(Object.values(req.body).includes("")) {
            return res.status(400).json({msg: "Lo sentimos, debes llenar todos los campos"})
        }
        
        const SubjectBDD = await Subject.findOne({codigo:updates.materia})
        
        if(!SubjectBDD){return res.status(400).json({msg:"matricula no registrado"})}
        const validFields = ['descripcion','materia',"creditos"]
        const filteredFields = {}

        for(const field in updates){
            if(validFields.includes(field)){
                filteredFields[field]=updates[field]
            }
        }
    
        if (Object.keys(filteredFields).length === 0) {
            return res.status(400).json({ msg: "No se proporcionaron campos válidos para actualizar" })
        }
    
        await Enrollment.findByIdAndUpdate(id,filteredFields,{new:true})
    
        const response = await Enrollment.findById(id).lean().select("-__v")
        res.status(200).json({msg:"Reserva actualizada",response})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Lo sentimos, ha ocurrido un error"})
    }
}

const DeleteEnrollment = async(req,res) => {
    const {id} = req.params
    if(!id){
        return res.status(400).json({msg: "Lo sentimos, debes proporcionar un id de Matriculas"})
    }

    try {
        const deletedEnroll = await Enrollment.findByIdAndDelete(id)
        if(!deletedEnroll){
            return res.status(400).json({msg: "Matricula no registrada"})
        }
        return res.status(200).json({msg: "Matricula eliminada exitosamente"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Lo sentimos, algo salio mal"})
    }
}

export{
    RegisterEnrollment,
    GetEnrollments,
    GetEnrollmentsById,
    UpdateEnrollment,
    DeleteEnrollment
}

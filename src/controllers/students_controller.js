import Student from '../models/students_model.js'

const RegisterStudent = async (req,res) => {
    try {
        const {cedula} = req.body

        const StudentBDD = await Student.findOne({cedula:cedula})
        if(StudentBDD){return res.status(400).json({msg:"Estudiante ya registrado"})}
        
        const newStudent = new Student(req.body)
        await newStudent.save()
        return res.status(201).json({msg:"Estudiante registrado exitosamente"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:"Lo sentimos, algo salio mal"})
    }
}

const GetStudents = async (req,res) => {
    try {
        const StudentBDD = await Student.find()
        const response = StudentBDD.map(student =>({
            _id:student.id,
            cedula:student.cedula,
            nombre:student.nombre,
            apellido:student.apellido,
            email:student.email,
            ciudad:student.ciudad,
            direccion:student.direccion,
            telefono:student.telefono,
            fecha_nacimiento:student.fecha_nacimiento,
        }))

        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Lo sentimos, algo salio mal"})
    }
}

const GetStudentById = async (req,res) => {
    try {
        const {codigo}= req.params
        const StudentBDD = await Student.findOne({codigo:codigo})
        if(!StudentBDD){return res.status(400).json({msg:"Estudiante no registrado"})}
        const response = {
            _id:StudentBDD.id,
            cedula:StudentBDD.cedula,
            nombre:StudentBDD.nombre,
            apellido:StudentBDD.apellido,
            email:StudentBDD.email,
            ciudad:StudentBDD.ciudad,
            direccion:StudentBDD.direccion,
            telefono:StudentBDD.telefono,
            fecha_nacimiento:StudentBDD.fecha_nacimiento,
        }

        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Lo sentimos, algo salio mal"})
    }
}

const UpdateStudent = async (req,res) => {
    const { id } = req.params
    const updates = req.body
    if (!id) { return res.status(400).json({ msg: "Lo sentimos, debes proporcionar un id" }) }
    try {
        // Obtener los datos del tecnico a actualizar
        const validFields = ['nombre', 'apellido', 'email', 'ciudad', 'direccion', 'relefono']
        const filteredFields = {}

        for (const field in updates) {
            if (validFields.includes(field)) {
                filteredFields[field] = updates[field]
            }
        }

        // Validar si hay campos válidos para actualizar
        if (Object.keys(filteredFields).length === 0) {
            return res.status(400).json({ msg: "No se proporcionaron campos válidos para actualizar" })
        }

        await Student.findByIdAndUpdate(id, filteredFields, { new: true })

        const response = await Student.findById(id).lean().select("-__v")

        return res.status(200).json({ msg: "Conferencista actualizado exitosamente", response })
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Lo sentimos, algo salio mal"})
    }
}

const DeleteStudent = async (req,res) => {
    const {id} = req.params
    if(!id){
        return res.status(400).json({msg: "Lo sentimos, debes proporcionar un id de Vehiculos"})
    }

    try {
        const deletedStudent = await Student.findByIdAndDelete(id)
        if(!deletedStudent){
            return res.status(400).json({msg: "El Estudiante no existe"})
        }
        return res.status(200).json({msg: "Estudiante eliminado exitosamente"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Lo sentimos, algo salio mal"})
    }
}

export {
    RegisterStudent,
    GetStudentById,
    GetStudents,
    UpdateStudent,
    DeleteStudent
}

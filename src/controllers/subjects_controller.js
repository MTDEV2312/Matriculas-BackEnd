import Subjects from '../models/subjects_model.js'

const RegisterSubject = async (req, res) => {
    try {
        const { codigo } = req.body

        //? Verifica si un campo esta vacio
        if (Object.values(req.body).includes("")) {
            return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })
        }
    
        const subjectBDD = await Subjects.findOne({codigo:codigo})
        if(subjectBDD){return res.status(400).json({msg:"el codigo de materia ya se encuentra registrado"})}
    
        const newSubject = new Subjects(req.body)
        await newSubject.save()
        return res.status(201).json({msg:"Materia registrada correctamente"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:"Lo sentimos, algo salio mal"})
    }
}

const GetSubjects = async(req,res) => {
    try {
        const SubjectBDD = await Subjects.find()
        const response = SubjectBDD.map(subject => ({
            _id:subject.id,
            codigo:subject.codigo,
            nombre:subject.nombre,
            descripcion:subject.descripcion,
            creditos:subject.creditos
        }))
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Lo sentimos, algo salio mal"})
    }


}

const GetSubjectById = async(req,res) => {
    try {
        const {codigo} = req.params
        
        const SubjectBDD = await Subjects.findOne({codigo:codigo})
        if(!SubjectBDD){return res.status(400).json({msg:"Materia no registrada"})}
        
        const response = {
            _id:SubjectBDD.id,
            codigo:SubjectBDD.codigo,
            nombre:SubjectBDD.nombre,
            descripcion:SubjectBDD.descripcion,
            creditos:SubjectBDD.creditos
        }

        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Lo sentimos, algo salio mal"})
    }


}


const UpdateSubject = async(req,res) => {
    const { id } = req.params
    const updates = req.body
    if (!id) { return res.status(400).json({ msg: "Lo sentimos, debes proporcionar un id" }) }
    try {
        // Obtener los datos del tecnico a actualizar
        const validFields = ['nombre', 'descripcion', 'creditos']
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

        await Subjects.findByIdAndUpdate(id, filteredFields, { new: true })

        const response = await Subjects.findById(id).lean().select("-__v")

        return res.status(200).json({ msg: "Materia actualizado exitosamente", response })
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Lo sentimos, algo salio mal"})
    }
}

const DeleteSubject = async (req,res) => {
    const {id} = req.params
    if(!id){
        return res.status(400).json({msg: "Lo sentimos, debes proporcionar un id de materias"})
    }

    try {
        const deletedSubject = await Subjects.findByIdAndDelete(id)
        if(!deletedSubject){
            return res.status(400).json({msg: "La materia no existe"})
        }
        return res.status(200).json({msg: "La materia ha sido eliminada exitosamente"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg: "Lo sentimos, algo salio mal"})
    }
}

export {
    RegisterSubject,
    GetSubjects,
    GetSubjectById,
    UpdateSubject,
    DeleteSubject
}


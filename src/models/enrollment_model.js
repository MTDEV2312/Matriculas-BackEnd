import {Schema,model} from 'mongoose'

const enrollmentSchema = new Schema({
    codigo:{
        type:Number,
        trim:true,
        required:true,
        unique:true
    },
    descripcion:{
        type:String,
        trim:true,
        required:true
    },
    creditos:{
        type:Number,
        trim:true,
        required:true,
        min:0
    },
    materia:{
        type:String,
        trim:true,
        required:true,
        ref:'Subjects'
    },
    estudiante:{
        type:String,
        trim:true,
        required:true,
        ref:'Students'
    }
},{
    timestamps:true
})

export default model('Enrollment',enrollmentSchema)
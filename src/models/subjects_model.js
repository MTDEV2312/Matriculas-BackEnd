import {Schema,model} from 'mongoose'

const subjectSchema = new Schema({
    codigo:{
        type:String,
        trim:true,
        unique:true,
        required:true
    },
    nombre:{
        type:String,
        trim:true,
        required:true
    },
    descripcion:{
        type:String,
        trim:true,
        required:true
    },
    creditos:{
        type:Number,
        trim:true,
        require:true,
        min:0
    }
},{
    timestamps:true
})

export default model('Subjects',subjectSchema)
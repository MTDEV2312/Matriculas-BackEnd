import {body,param} from 'express-validator'

const singleNameRegex = /^[A-Za-zÁáÉéÍíÓóÚúÑñ]+$/

const RegisterSubjectValidator = [
    body('codigo')
        .trim()
        .notEmpty().withMessage("El codigo es requerido")
        .isString().withMessage("El codigo debe ser un String")
        .isLength({min:5,max:20}).withMessage("El codigo debe tener min 5 caracteres max 20"),
    body('nombre')
        .trim()
        .notEmpty().withMessage('El nombre es requerido')
        .matches(singleNameRegex).withMessage('El nombre debe ser solo letras')
        .isLength({min:3,max:20}).withMessage('El nombre debe tener al menos 3 caracteres y 20 caracteres'),
    body('descripcion')
        .trim()
        .notEmpty().withMessage("La descripcion es requerida")
        .isLength({min:10,max:300}).withMessage("La descripcion requiere un min de 10 y un max 300 caracteres"),
    body('creditos')
        .trim()
        .notEmpty().withMessage("El numero de creditos es requerido")
        .isNumeric().withMessage("Solo se aceptan numeros")
        .isInt({min:0}).withMessage("Solo se aceptan numeros enteros >= 0")
]

const GetSubjectByIdValidator = [
    param('codigo')
        .trim()
        .notEmpty().withMessage("El codigo es requerido")
        .isString().withMessage("El codigo debe ser un String")
        .isLength({min:5,max:20}).withMessage("El codigo debe tener min 5 caracteres max 20"),
]

const UpdateSubjectValidator = [
    param('id')
        .trim()
        .notEmpty().withMessage('El id es requerido')
        .isMongoId().withMessage('El id no es valido'),
    body('nombre')
        .optional()
        .trim()
        .notEmpty().withMessage('El nombre es requerido')
        .matches(singleNameRegex).withMessage('El nombre debe ser solo letras')
        .isLength({min:3,max:20}).withMessage('El nombre debe tener al menos 3 caracteres y 20 caracteres'),
    body('descripcion')
        .optional()
        .trim()
        .notEmpty().withMessage("La descripcion es requerida")
        .isLength({min:10,max:300}).withMessage("La descripcion requiere un min de 10 y un max 300 caracteres"),
    body('creditos')
        .optional()
        .trim()
        .notEmpty().withMessage("El numero de creditos es requerido")
        .isNumeric().withMessage("Solo se aceptan numeros")
        .isInt({min:0}).withMessage("Solo se aceptan numeros enteros >= 0")
]

const DeleteSubjectValidator = [
    param('id')
        .trim()
        .notEmpty().withMessage('El id es requerido')
        .isMongoId().withMessage('El id no es valido'),
]

export{
    RegisterSubjectValidator,
    GetSubjectByIdValidator,
    UpdateSubjectValidator,
    DeleteSubjectValidator
}
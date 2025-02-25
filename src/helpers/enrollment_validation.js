import { body, param } from 'express-validator'
import { isCedula } from 'validator-ec'

const RegisterEnrollValidator = [
    body('codigo')
        .trim()
        .notEmpty().withMessage("El codigo es requerido")
        .isNumeric().withMessage("El codigo debe ser un número")
        .isLength({ min: 4, max: 11 }).withMessage("El codigo debe tener min 4 y max 20 caracteres"),
    body('descripcion')
        .trim()
        .notEmpty().withMessage("La descripcion es requerida")
        .isLength({ min: 10, max: 500 }).withMessage("La descripcion debe tener min 10 y max 500 caracteres"),
    body('materia')
        .isArray().withMessage("La materia debe ser un array de códigos")
        .notEmpty().withMessage("La materia es requerida")
        .custom((value) => {
            // Verifica si cada código en el array es una cadena no vacía
            if (!value.every(item => typeof item === 'string' && item.trim() !== '')) {
                throw new Error('Cada código de materia debe ser una cadena no vacía');
            }
            return true;
        }),
    body('estudiante')
        .trim()
        .notEmpty().withMessage('La cedula es requerida')
        .isLength({ min: 10 }).withMessage('La cedula debe tener al menos 10 caracteres')
        .isNumeric().withMessage('La cedula debe ser un número')
        .custom((value) => {
            if (!isCedula(value)) {
                throw new Error('Cédula ecuatoriana inválida')
            }
            return true
        })
]

const GetEnrollByIdValidator = [
    param('codigo')
        .trim()
        .notEmpty().withMessage("El codigo es requerido")
        .isNumeric().withMessage("El codigo debe ser un número")
]

const UpdateEnrollValidator = [
    param('id')
        .trim()
        .notEmpty().withMessage('El id es requerido')
        .isMongoId().withMessage('El id no es valido'),
    body('descripcion')
        .optional()
        .trim()
        .notEmpty().withMessage("La descripcion es requerida")
        .isLength({ min: 10, max: 500 }).withMessage("La descripcion debe tener min 10 y max 500 caracteres"),
    body('materia')
        .optional()
        .isArray().withMessage("La materia debe ser un array de códigos")
        .notEmpty().withMessage("La materia es requerida")
        .custom((value) => {
            // Verifica si cada código en el array es una cadena no vacía
            if (!value.every(item => typeof item === 'string' && item.trim() !== '')) {
                throw new Error('Cada código de materia debe ser una cadena no vacía');
            }
            return true;
        })
]

const DeleteEnrollValidator = [
    param('id')
        .trim()
        .notEmpty().withMessage('El id es requerido')
        .isMongoId().withMessage('El id no es valido'),
]

export{
    RegisterEnrollValidator,
    GetEnrollByIdValidator,
    UpdateEnrollValidator,
    DeleteEnrollValidator
}



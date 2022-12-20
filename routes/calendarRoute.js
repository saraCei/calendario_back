const {Router}=require('express')
const {check}=require('express-validator')

const { getEvents, updateEvent, createEvent, deleteEvent } = require('../controllers/calendarController')
const { isDate } = require('../helpers/isDate')
const { validarInputs } = require('../middlewares/validarInputs')
const { validateJWT } = require('../middlewares/validateJWT')

const router= Router()

router.use(validateJWT)

// Recoger los eventos
router.get('/',getEvents)

// Crear un evento
router.post('/',[
    check('title',"Debes escribir el título").not().isEmpty(),
    check('start',"Debes indicar la fecha de inicio").custom(isDate),
    check('end',"Debes indicar la fecha de finalización").custom(isDate),
    validarInputs
],createEvent)


// Actualizar un evento
router.put('/:id',[
    check('title',"Debes escribir el título").not().isEmpty(),
    check('start',"Debes indicar la fecha de inicio").custom(isDate),
    check('end',"Debes indicar la fecha de finalización").custom(isDate),
    validarInputs
],updateEvent)

// Eliminar un evento
router.delete('/:id',deleteEvent)

module.exports=router;
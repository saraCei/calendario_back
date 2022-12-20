const {Router}=require('express')
const {check}=require('express-validator')

const { getEvents, updateEvent, createEvent, deleteEvent } = require('../controllers/calendarController')
const { validateJWT } = require('../middlewares/validateJWT')

const router= Router()

router.use(validateJWT)

// Recoger los eventos
router.get('/',getEvents)

// Crear un evento
router.post('/',createEvent)

// Actualizar un evento
router.put('/:id',updateEvent)

// Eliminar un evento
router.delete('/:id',deleteEvent)

module.exports= router;
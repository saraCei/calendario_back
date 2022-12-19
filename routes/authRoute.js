const {Router}=require('express')
const {check}=require('express-validator')
const { createUser, loginUser, renewToken } = require('../controllers/authController')
const { validarInputs } = require('../middlewares/validarInputs')
const { validateJWT } = require('../middlewares/validateJWT')
const router = Router()

//Register
router.post('/new',[
    check('name','Debes escribir el nombre').not().isEmpty(),
    check('email','Debes escribir un email correcto').isEmail(),
    check('password','La contraseña debe tener entre 6 y 10 caracteres').isLength({min:6,max:10}),
    validarInputs
],createUser)

//Login
router.post('/',[
    check('email','Debes escribir un email correcto').isEmail(),
    check('password','La contraseña debe tener entre 6 y 1 caracteres').isLength({min:6,max:10}),
    validarInputs
],loginUser)

//Renew Jason Web Token
router.get('/renew',validateJWT,renewToken)


module.exports=router;
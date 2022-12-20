const User = require('../models/UserModel')
const bcrypt = require('bcryptjs');
const { JWTGenerator } = require('../helpers/jwt');

// Create User
const createUser=async(req,res)=>{

    const {name,email,password}=req.body;

    try {

        // validar q el usuario no exista
        let usuario=await User.findOne({email})
        if(usuario){
            return res.status(400).json({
                ok:false,
                msg:'El usuario ya existe'
            })
        }

        usuario = new User(req.body)
        
        //encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt) //reemplazamos la contraseña del usuario por la contraseña encriptada
        //console.log(usuario.password)

        //subir el usuario a la base de datos
        await usuario.save()

        //crear token
        const token=await JWTGenerator(usuario.id, usuario.name)

        //retornar la respuesta
        res.status(201).json({
            ok:true,
            msg:'registrando nuevo usuario',
            token
            // user:{
            //     ...usuario
            // }
        })
        
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Contacta con el administrador'
        })
    } 
    }


// Login User
const loginUser=async (req,res)=>{

    // console.log('req.body: ', req.body)

    const {email, password} = req.body

    try {

        const usuario = await User.findOne({email})

        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg:'No hay usuario con el email'
            })
        }

        // Comprobar contraseña
        const passwordOk=bcrypt.compareSync(password,usuario.password)

        if(!passwordOk){
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es válida'
            })
        }

        // Generar JWT
        const token=await JWTGenerator(usuario.id, usuario.name)

        const user = {
            name: usuario.name,
            email: usuario.email,
            uid: usuario._id
        }

        return res.status(200).json({
            ok:true,
            msg:'Usuario logueado',
            user,
            token
        })
        
    } catch (error) {
        //console.log(error) //aparecerá en la consola del servidor
        return res.status(500).json({
            ok:false,
            msg:'Contacta con el administrador'
        })
    }

}

// Renew Token
const renewToken=async(req,res)=>{

    const {uid,name}=req

    // Generar un nuevo token
    const token=await JWTGenerator(uid,name)

    res.json({
        ok:true,
        msg:'renew token',
        token
    })
}


module.exports={
    createUser,
    loginUser,
    renewToken
}

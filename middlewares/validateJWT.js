const jwt=require('jsonwebtoken')

const validateJWT=(req,res,next)=>{

    const token=req.header('x-token')

    if(!token){
        return res.status(401).json({
            ok:false,
            msg: 'no hay token en la petición'
        })
    }

    try{

        const payload=jwt.verify(token,process.env.JWT_SECRET_KEY)
        console.log(payload)
        req.ui=payload.uid
        req.name=payload.name

    } catch(error){
        return res.status(401).json({
            ok:false,
            msg: 'token no válido'
        })
    }

    next()
}

module.exports={
    validateJWT
}


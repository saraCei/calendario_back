const mongoose=require('mongoose')

const dbConnect=async()=>{
    try {
        mongoose.set('strictQuery',true)
        await mongoose.connect(process.env.DB_CNN)
        console.log('conectado a la base de datos')
    } catch (error) {
        console.log(error)
        throw new Error('Error al conectar con la base de datos')
    }
}

module.exports={
    dbConnect
}
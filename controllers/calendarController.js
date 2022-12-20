const Event=require('../models/EventModel')

const getEvents = (req, res) =>{

    const events=async(req,res)=>{

        const events=await Event.find().populate('user','name email')
        
    return res.status(200).json({
        ok:true,
        msg:'recoger eventos',
        events
    })
    }


}


const createEvent = async(req, res) =>{

    const event = new Event(req.body)

    try {
        event.user=req.uid
        const eventSaved=await event.save()

        return res.status(201).json({
            ok:true,
            msg:'creando evento',
            eventSaved
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg:'contacta al administrador'
        })
    }

}


const updateEvent = async(req, res) =>{

    const eventId=req.params.id
    const uid=req.uid

    try {
        const event=await Event.findById(eventId)

        if(!event){
            return res.status(404).json({
                ok:false,
                msg:'No hay evento con ese id'
            })
        }

        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'No tienes privilegios para editar'
            })
        }

        const newEvent={
            ...req.body,
            user:uid
        }

        const editedEvent = await Event.findByIdAndUpdate(eventId,newEvent,{new:true})

        return res.status(200).json({
            ok:true,
            msg:'actualizar evento',
            editedEvent
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'contacta al administrador'
        })
    }


}


const deleteEvent = async(req, res) =>{
    

    const eventId=req.params.id
    const uid=req.uid

    try {
        const event=await Event.findById(eventId)

        if(!event){
            return res.status(404).json({
                ok:false,
                msg:'No hay evento con ese id'
            })
        }

        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'No tienes privilegios para eliminar'
            })
        }

        // const newEvent={
        //     ...req.body,
        //     user:uid
        // }

        const editedEvent = await Event.findByIdAndRemove(eventId,{new:true})

        return res.status(200).json({
            ok:true,
            msg:'evento eliminado',
            editedEvent
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'contacta con el administrador'
        })
    }

}

module.exports={
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}


const getEvents = (req, res) =>{

    res.status(200).json({
        ok:true,
        msg:'recoger eventos'
    })

}


const createEvent = (req, res) =>{

    res.status(200).json({
        ok:true,
        msg:'crear evento'
    })
}


const updateEvent = (req, res) =>{
    
    res.status(200).json({
        ok:true,
        msg:'actualizar evento'
    })

}


const deleteEvent = (req, res) =>{
    
    res.status(200).json({
        ok:true,
        msg:'eliminar evento'
    })

}

module.exports={
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}
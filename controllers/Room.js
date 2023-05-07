import { Room } from "../models/Room.js";

export const addRoomies=async(req,res)=>{
    try {
       const {id, roomie}=req.query
       const  room=await Room.findById(id)
       
       const roomies=await room.roomies.length
      
       if(roomies>=room.sharing){
        return res.status(404)
        .json({
            success:false,
            message:"The room is already filled"
        })
       }

       await room.roomies.push(roomie)
       await room.save()
       res.status(200)
       .json({
        success:true,
        message:"The Roomie has been added",
        room
       })


    } catch (error) {
        res.status(404)
        .json({
            success:false,
            message:error.message
        })
    }

}

export const deleteRoomies=async(req,res)=>{
try {
    const {id,roomie}=req.query    
    const room=await Room.findById(id)

    // if(room.roomies.includes(roomie))
        const index=room.roomies.indexOf(roomie)
        room.roomies.splice(index,1)
        await room.save()
    
    // await room.roomies.pop(roomie._id)
    res.status(200)
    .json({
        success:true,
        message:"The roomie has been deleted",
        room
    })
} catch (error) {
    res.status(404)
    .json({
        success:false,
        message:error.message
    })
}
}

export const addRoom=async(req,res)=>{
    try {
        const {roomno,rent,floor,sharing,attachedBathroom,
        balcony,meals,pg}=req.query
        let room=await Room.findOne({roomno:roomno,pg:pg})

        if(room){
            return res.status(404)
            .json({
                success:false,
                message:"The room already exists"
            })
        }

        room=await Room.create({
            roomno,rent,floor,sharing,attachedBathroom,
        balcony,meals,pg
        })

        res.status(200)
        .json({
            success:true,
            message:"The Room got listed",
            room
        })

    } catch (error) {
        res.status(404)
        .json({
            success:true,
            message:error.message
        })
    }
}

export const deleteRoom=async(req,res)=>{
    try {
        const {id}=req.query
        const room=await Room.findOneAndDelete({_id:id})
        res.status(200)
        .json({
            success:true,
            message:"The room deleted successfully",
            room
        })
    } catch (error) {
        res.status(404)
        .json({
            success:false,
            message:error.message
        })
    }
}


export const editRoom=async(req,res)=>{
    try {
        const {roomno,rent,floor,sharing,attachedBathroom,
        balcony,meals,pg}=req.query
        let room=await Room.findOne({roomno:roomno,pg:pg})

        if(!room){
            return res.status(404)
            .json({
                success:false,
                message:"The room doesn't exist"
            })
        }

        room.rent=rent
        room.floor=floor
        room.sharing=sharing
        room.attachedBathroom=attachedBathroom
        room.balcony=balcony
        room.meals=meals
        room.pg=pg
        await room.save()

        res.status(200)
        .json({
            success:true,
            message:"The Room got listed",
            room
        })

    } catch (error) {
        res.status(404)
        .json({
            success:true,
            message:error.message
        })
    }
}


export const searchRoom=async(req,res)=>{
    try {
        const {roomno,rent,floor,sharing,attachedBathroom,
        balcony,meals,pg}=req.query

       const  rooms=await Room.find({
            roomno,rent,floor,sharing,attachedBathroom,
        balcony,meals,pg
        })

        res.status(200)
        .json({
            success:true,
            message:"The Room got listed",
            rooms
        })

    } catch (error) {
        res.status(404)
        .json({
            success:true,
            message:error.message
        })
    }
}
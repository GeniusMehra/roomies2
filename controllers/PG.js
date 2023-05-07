import { PG } from "../models/PG.js";

export const search=async(req,res)=>{
    try {
        const {location}=req.query;
        const pgs=await PG.find({location})
        res.status(200)
        .json({
            success:true,
            message:"These are the pgs",
            pgs
        })
    } catch (error) {
        res.status(404)
        .json({
            success:false,
            message:error.message
        })
    }
}

export const newPg=async(req,res)=>{
    try {
        const {owner,location,manager,pgname,name}=req.query;
        const pg=await PG.create({
            owner,
            location,
            manager,
            pgname,
            name
        })

        res.status(200)
        .json({
            success:true,
            message:"PG registered",
            pg
        })
            
    } catch (error) {
        res.status(404)
        .json({
            success:false,
            message:error.message
        })
    }
}

export const editPg=async(req,res)=>{
    try {
        const {owner,location,manager,pgname,name}=req.query;
        const pg=await PG.findOne({pgname})

        pg.owner=owner,
        pg.location=location
        pg.manager=manager
        pg.pgname=pgname
        pg.name=pg.name
        await pg.save()

        res.status(200)
        .json({
            success:true,
            message:"PG registered",
            pg
        })
            
    } catch (error) {
        res.status(404)
        .json({
            success:false,
            message:error.message
        })
    }
}

export const deletePg=async(req,res)=>{
    const {pgname}=req.query;
    const pg=await PG.deleteOne({pgname})
    res.status(200)
    .json({
        success:true,
        message:"Pg deleted"
    })

}
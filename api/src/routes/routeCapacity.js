const { Router } = require("express");
const {  StorageCapacity} = require("../db.js");
const router = Router();

router.get('/', async(req, res)=>{
    try {
        const capacity= await StorageCapacity.findAll();

        if(capacity){
            res.send(capacity).status(200)
        }else{
            res.status(400).json({msg:"not found"})
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports= router;
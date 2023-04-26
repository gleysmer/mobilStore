const { Router } = require("express");
const {  Color} = require("../db.js");
const router = Router();

router.get('/', async(req, res)=>{
    try {
        const colorr= await Color.findAll();

        if(colorr){
            res.send(colorr).status(200)
        }else{
            res.status(400).json({msg:"not found"})
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports= router;
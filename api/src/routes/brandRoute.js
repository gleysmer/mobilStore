const { Router } = require("express");
const {  Brand} = require("../db.js");
const router = Router();

router.get('/', async(req, res)=>{
    try {
        const brand= await Brand.findAll();

        if(brand){
            res.send(brand).status(200)
        }else{
            res.status(400).json({msg:"not found"})
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports= router;
const { Router } = require("express");
const { User, Orders } = require("../db.js");
const { Op, Sequelize } = require("sequelize");
const router = Router();

router.get('/user', async(req, res) => {
    try {
        const { fechaInicio, fechaFin, enabled } = req.query

        const whereClause = {
            createdAt: {
                [Op.gte]: fechaInicio,
                [Op.lte]: fechaFin
            }
        }
        
        if (typeof enabled === 'undefined') {
            whereClause.enabled = true
        }

        if(!fechaInicio && !fechaFin && !enabled){
            const usuariosActivos = await User.findAndCountAll({
                where: {
                    enabled: true
                }
            })
            const usuariosInactivos = await User.findAndCountAll({
                where: {
                    enabled: false
                }
            })
            
            res.status(200).json({enabled: usuariosActivos.count, disabled: usuariosInactivos.count } )
        }
        
        if(fechaInicio && fechaFin && !enabled){
            const usuariosActivos = await User.findAndCountAll({
                where: whereClause
            })

            const usuariosInactivos = await User.findAndCountAll({
                where: { enabled: false }
            })
            // console.log(enabled)
            res.status(200).json({msg: `Hay ${usuariosActivos.count} usuario/s activos entre las fechas ${fechaInicio} y ${fechaFin}, tambien hay ${usuariosInactivos.count} baneados en el mismo periodo`})
        }
        
        if(fechaInicio && !fechaFin ){
            const usuariosActivos = await User.findAndCountAll({
                where: {
                    createdAt: {
                        [Op.gte]: fechaInicio
                        
                    },
                    enabled: true
                }
            })
            // console.log(usuariosActivos)
            const usuariosInactivos = await User.findAndCountAll({
                where: {
                    createdAt: {
                        [Op.gte]: fechaInicio
                        
                    },
                    enabled: false
                }
            })
            res.status(200).json({msg: `Desde el ${fechaInicio} hay ${usuariosActivos.count} usuarios activos y ${usuariosInactivos.count} usuarios inactivos`})
        }
        
        if(!fechaInicio && fechaFin ){
            const usuariosActivos = await User.findAndCountAll({
                where: {
                    createdAt: {
                        [Op.lte]: fechaFin
                        
                    },
                    enabled: true
                }
            })
            // console.log(usuariosActivos)
            const usuariosInactivos = await User.findAndCountAll({
                where: {
                    createdAt: {
                        [Op.lte]: fechaFin
                        
                    },
                    enabled: false
                }
            })
            res.status(200).json({msg: `Hasta el ${fechaFin} hay ${usuariosActivos.count} usuarios activos y ${usuariosInactivos.count} usuarios inactivos`})
        }
    }catch(error){
        res.status(400).json({error: error.message})
    }
})

router.get('/order', async (req, res) => {
   try {
        const { fechaInicio, fechaFin, status } = req.query;
        
        if(fechaInicio && fechaFin){
            const order = await Orders.findAndCountAll({
                attributes: [
                    [Sequelize.fn('SUM', Sequelize.col('total')), 'total']
                ],
                where: {
                    date: {
                        [Op.gte]: fechaInicio,
                        [Op.lte]: fechaFin
                    }
                }
            })
            res.status(200).json({count: order.count, total: parseFloat(order.rows[0].total)})
        }
        if(!fechaInicio && !fechaFin){
            const order = await Orders.findAndCountAll({
                attributes: [
                    [Sequelize.fn('SUM', Sequelize.col('total')), 'total']
                ]
            })
            // console.log("order es:", order)
            res.status(200).json({count: order.count, total: parseFloat(order.rows[0].total)})
        }
        if(fechaInicio && !fechaFin){
            const order = await Orders.findAndCountAll({
                attributes: [
                    [Sequelize.fn('SUM', Sequelize.col('total')), 'total']
                ],
                where: {
                    date: {
                        [Op.gte]: fechaInicio
                       
                    }
                }
            })
            res.status(200).json({count: order.count, total: parseFloat(order.rows[0].total)})
        }
        if(!fechaInicio && fechaFin){
            const order = await Orders.findAndCountAll({
                attributes: [
                    [Sequelize.fn('SUM', Sequelize.col('total')), 'total']
                ],
                where: {
                    date: {
                        [Op.lte]: fechaFin
                       
                    }
                }
            })
            res.status(200).json({count: order.count, total: parseFloat(order.rows[0].total)})
        }
        // console.log(order)
    } catch (error) {
        res.status(400).json({error: error.message})
   } 
})

module.exports= router;
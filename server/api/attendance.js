const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");
const { User,Absence,Message,Day,Coverage } = require("../db");

// GET localhost:3000/api/attendance/absences/:date
router.get('/absences/:date',async(req, res, next) => {
    try {
        const foundDate = await Day.findOne({
            where:{
                date:req.params.date
            }
        });
        if(foundDate){
            const absences = await Absence.findAll({
                where:{
                    dayId:foundDate.id
                },
                include:[User]
            })
            res.send(absences);
        }else{
            res.send([]);
        };
    }catch(error){
        next(error);
    };
});

module.exports = router;
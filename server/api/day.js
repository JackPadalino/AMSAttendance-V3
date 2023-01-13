const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");
const { User,Day,Absence,Message,Coverage } = require("../db");

// GET localhost:3000/api/day/:dayId
router.get('/:date',async(req, res, next) => {
    try {
        let day;
        const foundDate = await Day.findOne({
            where:{
                date:req.params.date
            }
        });
        if(foundDate){
            day=foundDate;
        }else{
            const newDay = await Day.create({
                date:req.params.date
            });
            day=newDay;
        };
        res.send(day);
    }catch(error){
        next(error);
    };
});

module.exports = router;
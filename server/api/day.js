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
            day = foundDate;
        }else{
            day = {}; // sending back an empty object if day does not exist
        };
        res.send(day);
    }catch(error){
        next(error);
    };
});

// POST localhost:3000/api/day
router.post('/',async(req, res, next) => {
    try {
        const data = {
            date:req.body.date,
            letterDay:req.body.letterDay
        };
        await Day.create(data);
        res.sendStatus(200);
    }catch(error){
        next(error);
    };
});

module.exports = router;
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

// POST localhost:3000/api/attendance/absences
router.post('/absences',async(req, res, next) => {
    try {
        const data = {
            userId:req.body.absentUserId,
            date:req.body.coverageDate,
            letterDay:req.body.coverageLetterDay
        };
        let todaysDate;
        const foundDate = await Day.findOne({
            where:{
                date:data.date
            }
        });
        if(foundDate) todaysDate=foundDate;
        else{
            const newDate = await Day.create({
                date:data.date,
                letterDay:data.letterDay
            });
            todaysDate=newDate;
        };
        await Absence.create({
            userId:data.userId,
            dayId:todaysDate.id
        });
        res.sendStatus(200);
    }catch(error){
        next(error);
    };
});

// GET localhost:3000/api/attendance/absences
router.get('/absences',async(req, res, next) => {
    try {
        const absences = await Absence.findAll({
            include:[User]
        });
        res.send(absences);
    }catch(error){
        next(error);
    };
});

// DELETE localhost:3000/api/attendance/absences
router.delete('/absences/:dayId/:userId',async(req, res, next) => {
    try {
        const foundAbsence = await Absence.findOne({
            where:{
                dayId:req.params.dayId,
                userId:req.params.userId
            }
        });
        if(foundAbsence) await foundAbsence.destroy();
        res.sendStatus(200);
    }catch(error){
        next(error);
    };
});

module.exports = router;
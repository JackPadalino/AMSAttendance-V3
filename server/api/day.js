const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");
const { User,Day,Absence,Message,Coverage } = require("../db");

// GET localhost:3000/api/day/:date
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

// GET localhost:3000/api/day
router.get('/:dayId',async(req, res, next) => {
    try {
        const foundDay = await Day.findByOk(req.params.dayId);
        res.send(foundDay);
    }catch(error){
        next(error);
    };
});

// GET localhost:3000/api/day
router.get('/',async(req, res, next) => {
    try {
        const days = await Day.findAll({
            include:[Absence]
        });
        res.send(days);
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

// DELETE localhost:3000/api/day/:dayId
router.delete('/:dayId',async(req,res,next)=>{
    const notFoundMessage = 'The object you are trying to delete does not exist!';
    try{
        const dayToDelete = await Day.findByPk(req.params.dayId);
        if(!dayToDelete) throw new Error(notFoundMessage);
        const absences = await Absence.findAll({
            where:{
                dayId:dayToDelete.id
            }
        });
        absences.forEach(async(absence)=>await absence.destroy());
        await dayToDelete.destroy();
        res.sendStatus(200);
    }catch(error){
        if(error.message===notFoundMessage){
            return res.status(404).send({message:notFoundMessage});
        }
        next(error);
    };
});

// PUT localhost:3000/api/day/:dayId
router.put('/:dayId',async(req,res,next)=>{
    const notFoundMessage = 'The object you are trying to update does not exist!';
    try{
        const data = {
            date:req.body.date,
            letterDay:req.body.letterDay
        };
        const dayToUpdate = await Day.findByPk(req.params.dayId);
        if(!dayToUpdate) throw new Error(notFoundMessage);
        const updatedDay = await dayToUpdate.update(data);
        res.send(updatedDay);
    }catch(error){
        next(error);
    };
});

module.exports = router;
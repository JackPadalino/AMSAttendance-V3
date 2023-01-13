const express = require("express");
const { Sequelize } = require("sequelize");
const router = express.Router();
const { User,Class,UserClass } = require("../db");

// GET localhost:3000/api/classes/:school/:period/:letter
router.get('/:school/:period/:letter',async(req, res, next) => {
    try {
        const [school,period,letter] = [req.params.school,Number(req.params.period),req.params.letter];
        let classes;
        if(school==='HS'){
            classes = await Class.findAll({
                where:{
                    [Sequelize.Op.or]:[
                        {[Sequelize.Op.and]: [{ school: 'HS' },{ period: period },{letterDays:{[Sequelize.Op.contains]: [letter]}}]},
                        {[Sequelize.Op.and]: [{ school: 'MS' },{ period: period },{letterDays:{[Sequelize.Op.contains]: [letter]}}]},
                        {[Sequelize.Op.and]: [{ school: 'MS' },{ period: period-1 },{letterDays:{[Sequelize.Op.contains]: [letter]}}]}
                    ]
                },
                include:[User]
            });
        };
        if(school==='MS'){
            classes = await Class.findAll({
                where:{
                    [Sequelize.Op.or]:[
                        {[Sequelize.Op.and]: [{ school: 'MS' },{ period: period },{letterDays:{[Sequelize.Op.contains]: [letter]}}]},
                        {[Sequelize.Op.and]: [{ school: 'HS' },{ period: period },{letterDays:{[Sequelize.Op.contains]: [letter]}}]},
                        {[Sequelize.Op.and]: [{ school: 'HS' },{ period: period+1 },{letterDays:{[Sequelize.Op.contains]: [letter]}}]}
                    ]
                },
                include:[User]
            });
        };
        res.send(classes);
    }catch(error){
        next(error);
    };
});

// GET localhost:3000/api/classes/:classId
router.get('/:userId/:letter',async(req, res, next) => {
    try {
        const user = await User.findByPk(req.params.userId, {
            include: [
                {
                    model: Class,
                    where:{
                        letterDays:{[Sequelize.Op.contains]: [req.params.letter]}
                    },
                    through: {
                        model: UserClass,
                        where: {
                            userId: req.params.userId
                        }
                    }
                }
            ]
          });
          res.send(user.classes);
    }catch(error){
        next(error);
    };
});

// GET localhost:3000/api/classes/coverages/:period
router.get('/coverages/:period',async(req, res, next) => {
    try {
        const freePeriod = await Class.findOne({
            where:{
                period:req.params.period,
                isFreePeriod:true
            },
            include:[User]
        });
        res.send(freePeriod);
    }catch(error){
        next(error);
    };
});

// GET localhost:3000/api/classes/:classId
router.get('/:classId',async(req, res, next) => {
    try {
        const classInfo = await Class.findByPk(req.params.classId,{
            include:[User]
        });
        res.send(classInfo);
    }catch(error){
        next(error);
    };
});

// GET localhost:3000/api/classes/
router.get('/',async(req, res, next) => {
    try {
        const classes = await Class.findAll({
            include:[User],
            order:[
                ['name','ASC']
            ]
        });
        res.send(classes);
    }catch(error){
        next(error);
    };
});

// POST localhost:3000/api/classes/
router.post('/',async(req, res, next) => {
    try {
        // creating the new class
        const classData = {
            name:req.body.className,
            school:req.body.school,
            grade:req.body.grade,
            period:req.body.period,
            letterDays:req.body.letterDays
        };
        const newClass = await Class.create(classData);
        
        // assigning teachers to the newly created class
        const teacherData = req.body.teacherNames;
        teacherData.forEach(async(fullName)=>{
            const foundTeacher = await User.findOne({
                where:{
                    fullName:fullName
                }
            });
            if(foundTeacher) await UserClass.create({userId:foundTeacher.id,classId:newClass.id});
        });

        res.sendStatus(200);
    }catch(error){
        next(error);
    };
});

// PUT localhost:3000/api/classes/
router.put('/:classId',async(req, res, next) => {
    const notFoundMessage = 'The object you are trying to update does not exist!';
    try {
        // updating the class data
        const classData = {
            name:req.body.className,
            school:req.body.school,
            grade:req.body.grade,
            period:req.body.period,
            letterDays:req.body.letterDays
        };
        const classToUpdate = await Class.findByPk(req.params.classId);
        if(!classToUpdate) throw new Error(notFoundMessage);
        await classToUpdate.update(classData);

        // updating the teacher data
        const teacherData = req.body.teacherNames;
        if(teacherData[0]!=='' || teacherData[1]!==''){
            const userClasses = await UserClass.findAll({
                where:{
                    classId:req.params.classId
                }
            });
            userClasses.forEach(async(userClass)=>{
                await userClass.destroy();
            });
            teacherData.forEach(async(fullName)=>{
                const foundTeacher = await User.findOne({
                    where:{
                        fullName:fullName
                    }
                });
                if(foundTeacher) await UserClass.create({userId:foundTeacher.id,classId:classToUpdate.id});
            });
        };

        res.sendStatus(200);
    }catch(error){
        if(error.message===notFoundMessage){
            return res.status(404).send({message:notFoundMessage});
        }
        next(error);
    };
});

// DELETE localhost:3000/api/classes/
router.delete('/:classId',async(req,res,next)=>{
    const notFoundMessage = 'The object you are trying to delete does not exist!';
    try{
        const classToDelete = await Class.findByPk(req.params.classId);
        if(!classToDelete) throw new Error(notFoundMessage);
        await classToDelete.destroy();
        res.sendStatus(200);
    }catch(error){
        if(error.message===notFoundMessage){
            return res.status(404).send({message:notFoundMessage});
        }
        next(error);
    };
});

module.exports = router;
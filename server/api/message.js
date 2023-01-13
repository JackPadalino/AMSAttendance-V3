const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");
const { MessagingResponse } = require('twilio').twiml;
const { User,Absence,Message,Day } = require("../db");
const {accountSID,authToken,twilioNumber} = require("../../bin/env");
const client = require('twilio')(accountSID,authToken);

// GET localhost:3000/api/message/send
router.get('/send',(req, res, next) => {
    try {
        const {
            message,
            receiver
        } = req.body;
        client.messages.create({
            body:message,
            from:twilioNumber,
            to:receiver
        });
        res.sendStatus(200);
    }catch(error){
        next(error);
    };
});

// POST localhost:3000/api/message/receive
router.post('/receive', async(req, res, next) => {
    try {
        const message = req.body.Body;
        const twiml = new MessagingResponse();
        if(message!=='1595'){
            twiml.message('Please enter 1595 to request a sick day/day off.');
        }else{
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const dateStr = `${year}-${month}-${day}`;
            let todaysDate;
            const foundDate = await Day.findOne({
                where:{
                    date:dateStr
                }
            });
            if(foundDate){
                todaysDate = foundDate;
            }else{
                const newDate = await Day.create({
                    date:dateStr
                });
                todaysDate = newDate;
            };
            const user = await User.findOne({
                where:{
                    phoneNumber:req.body.From
                }
            });
            if(!user){
                twiml.message('Sorry, you are not a registered staff member.');
            }else{
                const absence = await Absence.findOne({
                    where:{
                        userId:user.id,
                        dayId:todaysDate.id
                    }
                });
                if(absence){
                    twiml.message(`It looks like you have already made a request for date ${todaysDate.date}.`);
                }else{
                    await Absence.create({
                        userId:user.id,
                        dayId:todaysDate.id
                    });
                    twiml.message(`Your request for date ${todaysDate.date} is confirmed. Please be sure to share all sub materials with admin before 8:30AM.`);
                };
            };
        };
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    }catch(error){
        next(error);
    };
});

module.exports = router;
const { faker } = require('@faker-js/faker');

const createTeachers = () =>{
    for(let i=0;i<11;i++){
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const teacher = {
            firstName:firstName,
            lastName:lastName,
            email:faker.internet.email(firstName,lastName),
            phoneNumber:faker.phone.number('+1##########')
        };
        console.log(teacher);
    };
};

const createHSSchedules = () =>{
    for(let i=0;i<11;i++){
        const schedule = {
            firstPeriod:faker.helpers.arrayElement([faker.lorem.word(), null]),
            secondPeriod:faker.helpers.arrayElement([faker.lorem.word(), null]),
            thirdPeriod:faker.helpers.arrayElement([faker.lorem.word(), null]),
            fourthPeriod:faker.helpers.arrayElement([faker.lorem.word(), null]),
            fifthPeriod:'Lunch',
            sixthPeriod:faker.helpers.arrayElement([faker.lorem.word(), null]),
            seventhPeriod:faker.helpers.arrayElement([faker.lorem.word(), null]),
        };
        console.log(schedule);
    };
};

const createMSSchedules = () =>{
    for(let i=0;i<11;i++){
        const schedule = {
            firstPeriod:null,
            secondPeriod:null,
            thirdPeriod:null,
            fourthPeriod:null,
            fifthPeriod:null,
            sixthPeriod:null,
        };
        console.log(schedule);
    };
};

//createTeachers();
//createHSSchedules();
createMSSchedules();
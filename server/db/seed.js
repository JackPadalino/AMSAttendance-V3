const {
    db,
    User,
    Class,
    UserClass,
    Day,
    Absence,
    Coverage,
    Message
} = require('./');

const seed = async () => {
    console.log("STARTING DB SEED...");
    await db.sync({ force: true });

    //-------------create all users here-------------//
    const userList = [
        // create 10 HS teachers here
        {
            //fullName:'Jack Padalino',
            firstName:'Jack',
            lastName:'Padalino',
            email: 'J.Padalino@hotmail.com',
            phoneNumber: '+15858804798'
        },
        {
            //fullName:'Teah Watson',
            firstName:'Teah',
            lastName:'Watson',
            email: 'T.Watson@gmail.com',
            phoneNumber: '+15248333600'
        },
        {
            //fullName:'James Quinn',
            firstName:'James',
            lastName:'Quinn',
            email: 'j.Quinn@hotmail.com',
            phoneNumber: '+15248333601'
        },
        {
            //fullName:'Bismarck Oppong',
            firstName:'Bismarck',
            lastName:'Oppong',
            email: 'B.Oppong@hotmail.com',
            phoneNumber: '+15248333603'
        },
        {
            //fullName:'Ross Chodan',
            firstName:'Ross',
            lastName:'Chodan',
            email: 'R.Romain@yahoo.com',
            phoneNumber: '+15248333604'
        },
        {
            //fullName:'Jasmine Carsky',
            firstName:'Jasmine',
            lastName:'Carsky',
            email: 'J.Carsky@yahoo.com',
            phoneNumber: '+15248333605'
        },
        {
            //fullName:'Kelly Mobley',
            firstName:'Kelly',
            lastName:'Mobley',
            email: 'K.Mobley@hotmail.com',
            phoneNumber: '+15248333606'
        },
        {
            //fullName:'Lisa Lyons',
            firstName: 'Lisa',
            lastName: 'Lyons',
            email: 'Alicia_West75@yahoo.com',
            phoneNumber: '+15248333607'
        },
        {
            //fullName:'Michelle Stover',
            firstName:'Michelle',
            lastName:'Stover',
            email: 'M.Stover@gmail.com',
            phoneNumber: '+15248333608'
        },
        {
            //fullName:'Asatou Sohna',
            firstName: 'Asatou',
            lastName: 'Sohna',
            email: 'A.Sohna@yahoo.com',
            phoneNumber: '+15248333609'
        },
        // create 10 MS teachers here
        {
            //fullName:'Chaka Baker',
            firstName: 'Chaka',
            lastName: 'Baker',
            email: 'C.Baker@gmail.com',
            phoneNumber: '+15248333610'
        },
        {
            //fullName:'Joe Suppo',
            firstName: 'Joe',
            lastName: 'Suppo',
            email: 'J.Suppo@gmail.com',
            phoneNumber: '+15248333611'
        },
        {
            //fullName:'Matt Schoonmaker',
            firstName: 'Matt',
            lastName: 'Schoonmaker',
            email: 'M.Suppo@gmail.com',
            phoneNumber: '+15248333612'
        },
        {
            //fullName:'Melvin Rosado',
            firstName: 'Melvin',
            lastName: 'Rosado',
            email: 'M.Rosado@gmail.com',
            phoneNumber: '+15248333613'
        },
        {
            //fullName:'Chikudi Richardson',
            firstName: 'Chikudi',
            lastName: 'Richardson',
            email: 'C.Richardson@gmail.com',
            phoneNumber: '+15248333614'
        },
        {
            //fullName:'Shira Collado',
            firstName: 'Shira',
            lastName: 'Collado',
            email: 'S.Collado@gmail.com',
            phoneNumber: '+15248333615'
        },
        {
            //fullName:'Virginia Ford',
            firstName: 'Virginia',
            lastName: 'Ford',
            email: 'V.Ford@gmail.com',
            phoneNumber: '+15248333616'
        },
        {
            //fullName:'Rita Reinoso',
            firstName: 'Rita',
            lastName: 'Reinoso',
            email: 'R.Reinoso@gmail.com',
            phoneNumber: '+15248333617'
        },
        {
            //fullName:'Lena Pagoulatos',
            firstName: 'Lena',
            lastName: 'Pagoulatos',
            email: 'L.Pagoulatos@gmail.com',
            phoneNumber: '+15248333618'
        },
        {
            //fullName:'Melissa Alvarez',
            firstName: 'Melissa',
            lastName: 'Alvarez',
            email: 'M.Alvarez@gmail.com',
            phoneNumber: '+15248333619'
        },
        // create Admin users here
        {
            //fullName:'Reggie Scott',
            firstName: 'Reggie',
            lastName: 'Scott',
            email: 'R.Scott@amsbronx.org',
            phoneNumber: '+15248333620',
            username:'RScott',
            password:'1595Bathgate',
            role:'admin'
        },
        {
            //fullName:'Ingrid Chung',
            firstName: 'Ingrid',
            lastName: 'Chung',
            email: 'I.Chung@amsbronx.org',
            phoneNumber: '+15248333621',
            username:'IChung',
            password:'1595Bathgate',
            role:'admin'
        },
    ];

    const [
        // HS teachers
        JackPadalino,
        TeahWatson,
        JamesQuinn,
        BismarckOppong,
        RossChodan,
        JasmineCarsky,
        KellyMobley,
        LisaLyons,
        MichelleStover,
        AsatouSohna,
        // MS teachers
        ChakaBaker,
        JoeSuppo,
        MattSchoonmaker,
        MelvinRosado,
        ChikudiRichardson,
        ShiraCollado,
        VirginiaFord,
        RitaReinoso,
        LenaPagoulatos,
        MelissaAlvarez,
        // Admin
        ReggieScott,
        IngridChung
    ] = await Promise.all(userList.map((user) => User.create(user)));

    // //-------------create all classes here-------------//
    const classesList = [
        //~~~~~Lunch~~~~~//
        {name:'HS Lunch',school:'HS',period:5,letterDays:['A','B','C','D','E','F']},
        {name:'MS Lunch',school:'MS',period:5,letterDays:['A','B','C','D','E','F']},

        //~~~~~HS classes~~~~~//
        // 9th grade classes
        {name:'Global History',school:'HS',grade:9,period:1,letterDays:['A','B','C','D','E','F']},
        {name:'ELA',school:'HS',grade:9,period:3,letterDays:['A','B','C','D','E','F']},
        {name:'Oppong Advisory',school:'HS',grade:9,period:4,letterDays:['B','E']},
        {name:'Art Fundamentals',school:'HS',grade:9,period:4,letterDays:['A','C','D','F']},
        {name:'Rosado Advisory',school:'HS',grade:9,period:4,letterDays:['B','E']},
        {name:'ELA',school:'HS',grade:9,period:6,letterDays:['A','B','C','D','E','F']},
        {name:'Global History',school:'HS',grade:9,period:7,letterDays:['A','B','C','D','E','F']},
        {name:'Physics',school:'HS',grade:9,period:7,letterDays:['A','B','C','D','E','F']},
        {name:'ELA',school:'HS',grade:9,period:7,letterDays:['A','B','C','D','E','F']},
        // 10th grade classes
        {name:'Living Environment',school:'HS',grade:10,period:1,letterDays:['A','B','C','D','E','F']},
        {name:'ELA',school:'HS',grade:10,period:2,letterDays:['A','B','C','D','E','F']},
        {name:'Sohna Advisory',school:'HS',grade:10,period:3,letterDays:['A','D']},
        {name:'Intro. to CS1',school:'HS',grade:10,period:3,letterDays:['B','C','E','F']},
        {name:'Intro. to CS2',school:'HS',grade:10,period:3,letterDays:['B','C','E','F']},
        {name:'Painting',school:'HS',grade:10,period:4,letterDays:['A','C','E',]},
        {name:'Living Environment',school:'HS',grade:10,period:6,letterDays:['A','B','C','D','E','F']},
        {name:'Living Environment',school:'HS',grade:10,period:7,letterDays:['A','B','C','D','E','F']},
        // 11th grade classes
        {name:'AP Computer Science Principles',school:'HS',grade:11,period:1,letterDays:['A','B','C','D','E','F']},
        {name:'ELA',school:'HS',grade:11,period:1,letterDays:['A','B','C','D','E','F']},
        {name:'US History',school:'HS',grade:11,period:1,letterDays:['A','B','C','D','E','F']},
        {name:'Tech Careers',school:'HS',grade:11,period:2,letterDays:['A','B','D','E']},
        {name:'Lyons Advisory',school:'HS',grade:11,period:2,letterDays:['A','D']},
        {name:'Photography',school:'HS',grade:11,period:2,letterDays:['C','F']},
        {name:'US History',school:'HS',grade:11,period:3,letterDays:['A','B','C','D','E','F']},
        {name:'ELA',school:'HS',grade:11,period:3,letterDays:['A','B','C','D','E','F']},
        {name:'Music Production',school:'HS',grade:11,period:2,letterDays:['B','E']},
        {name:'Painting',school:'HS',grade:11,period:4,letterDays:['B','D','F']},
        {name:'US History',school:'HS',grade:11,period:7,letterDays:['A','B','C','D','E','F']},
        {name:'ELA',school:'HS',grade:11,period:7,letterDays:['A','B','C','D','E','F']},
        // 12th grade classes
        {name:'ELA',school:'HS',grade:12,period:1,letterDays:['A','B','C','D','E','F']},
        {name:'Econ. & Gov.',school:'HS',grade:12,period:1,letterDays:['A','B','C','D','E','F']},
        {name:'Photography',school:'HS',grade:12,period:2,letterDays:['B','E']},
        {name:'Padalino advisory',school:'HS',grade:12,period:2,letterDays:['C','F']},
        {name:'Carsky advisory',school:'HS',grade:12,period:2,letterDays:['C','F']},
        {name:'Watson advisory',school:'HS',grade:12,period:2,letterDays:['C','F']},
        {name:'Econ. & Gov.',school:'HS',grade:12,period:4,letterDays:['A','B','C','D','E','F']},
        {name:'AP Computer Science Principles',school:'HS',grade:12,period:6,letterDays:['A','B','C','D','E','F']},
        {name:'Econ. & Gov.',school:'HS',grade:12,period:7,letterDays:['A','B','C','D','E','F']},
        
        //~~~~~MS classes~~~~~//
        // 6th grade classes
        {name:'Math 6.3',school:'MS',grade:6,period:1,letterDays:['A','B','C','D','E','F']},
        {name:'Humanities 6.5',school:'MS',grade:6,period:1,letterDays:['A','B','C','D','E','F']},
        {name:'Ford Advisory',school:'MS',grade:6,period:2,letterDays:['A','C','E']},
        {name:'Richardson Advisory',school:'MS',grade:6,period:2,letterDays:['A','C','E']},
        {name:'Collado Advisory',school:'MS',grade:6,period:2,letterDays:['A','C','E']},
        {name:'AIR 6.4',school:'MS',grade:6,period:2,letterDays:['B','D','F']},
        {name:'AIR 6.3',school:'MS',grade:6,period:2,letterDays:['B','D','F']},
        {name:'AIR 6.2',school:'MS',grade:6,period:2,letterDays:['B','D','F']},
        {name:'Math Skills 6.1',school:'MS',grade:6,period:3,letterDays:['B','D','F']},
        {name:'Math 6.5',school:'MS',grade:6,period:3,letterDays:['B','D','F']},
        {name:'Math 6.5',school:'MS',grade:6,period:4,letterDays:['A','B','C','D','E','F']},
        {name:'Humanities 6.3',school:'MS',grade:6,period:4,letterDays:['A','B','C','D','E','F']},
        {name:'Humanities 6.4',school:'MS',grade:6,period:4,letterDays:['A','B','C','D','E','F']},
        {name:'Math 6.2',school:'MS',grade:6,period:4,letterDays:['A','B','C','D','E','F']},
        // 7th grade classes
        {name:'Humanities 7.2',school:'MS',grade:7,period:1,letterDays:['A','B','C','D','E','F']},
        {name:'Reinoso advisory',school:'MS',grade:7,period:2,letterDays:['B','D','F']},
        {name:'Alvarez advisory',school:'MS',grade:7,period:2,letterDays:['B','D','F']},
        {name:'Math 7.4',school:'MS',grade:7,period:1,letterDays:['A','B','C','D','E','F']},
        {name:'Math 7.3',school:'MS',grade:7,period:1,letterDays:['A','B','C','D','E','F']},
        {name:'Science 7.3',school:'MS',grade:7,period:3,letterDays:['B','D','F']},
        {name:'Math skills',school:'MS',grade:7,period:3,letterDays:['A','C','E']},
        {name:'Math 7.1',school:'MS',grade:7,period:4,letterDays:['A','B','C','D','E','F']},
        {name:'Math 7.2',school:'MS',grade:7,period:4,letterDays:['A','B','C','D','E','F']},
        {name:'Humanities 7.4',school:'MS',grade:7,period:4,letterDays:['A','B','C','D','E','F']},
        {name:'Humanities 7.3',school:'MS',grade:7,period:4,letterDays:['A','B','C','D','E','F']},
        // 8th grade classes
        {name:'Humanities 8.1',school:'MS',grade:8,period:1,letterDays:['A','B','C','D','E','F']},
        {name:'Suppo Advisory',school:'MS',grade:8,period:2,letterDays:['A','C','E']},
        {name:'Baker Advisory',school:'MS',grade:8,period:2,letterDays:['A','C','E']},
        {name:'Schoonmaker Advisory',school:'MS',grade:8,period:2,letterDays:['A','C','E']},
        {name:'Pagoulatos Advisory',school:'MS',grade:8,period:2,letterDays:['A','C','E']},
        {name:'Mindfullness',school:'MS',grade:8,period:2,letterDays:['B','D','F']},
        {name:'Science 8.1',school:'MS',grade:8,period:3,letterDays:['A','B','C','D','E','F']},
        {name:'Science 8.2',school:'MS',grade:8,period:3,letterDays:['A','B','C','D','E','F']},
        {name:'Humanities 8.3',school:'MS',grade:8,period:4,letterDays:['A','B','C','D','E','F']},
        {name:'Spanish 1',school:'MS',grade:8,period:6,letterDays:['C','F']},
        {name:'Spanish 2',school:'MS',grade:8,period:6,letterDays:['C','F']},
        {name:'Humanities 8.5',school:'MS',grade:8,period:1,letterDays:['A','B','C','D','E','F']},
    ];

    const [
        // Lunch periods
        HSLunch_P5,
        MSLunch_P5,
        // 9th grade classes
        GlobalHistory_G9P1,
        ELA_G9P3,
        OppongAdvisory_G9P4,
        ArtFundamentals_G9P4,
        RosadoAdvisory_G9P4,
        ELA_G9P6,
        GlobalHistory_G9P7,
        Physics_G9P7,
        ELA_G9P7,
        // 10th grade classes
        LivingEnvironment_G10P1,
        ELA_G10P2,
        SohnaAdvisory_G10P3,
        IntroCS1_G10P3,
        IntroCS2_G10P3,
        Painting_G10P4,
        LivingEnvironment_G10P6,
        LivingEnvironment_G10P7,
        // 11th grade classes
        APCSP_G11P1,
        ELA_G11P1,
        USHistory_G11P1,
        TechCareers_G11P2,
        LyonsAdvisory_G11P2,
        Photography_G11P2,
        USHistory_G11P3,
        ELA_G11P3,
        MusicProduction_G11P4,
        Painting_G11P4,
        USHistory_G11P7,
        ELA_G11P7,
        // 12th grade classes
        ELA_G12P1,
        EconGov_G12P1,
        Photography_G12P2,
        PadalinoAdvisory_G12P2,
        CarskyAdvisory_G12P2,
        WatsonAdvisory_G12P2,
        EconGov_G12P4,
        APCSP_G12P6,
        EconGov_G12P7,

        // 6th grade classes
        Math63_G6P1,
        Humanities65_G6P1,
        FordAdvisory_G6P2,
        RichardsonAdvisory_G6P2,
        ColladoAdvisory_G6P2,
        AIR64_G6P2,
        AIR63_G6P2,
        AIR62_G6P2,
        MathSkills61_G6P3,
        Math65_G6P3,
        Math65_G6P4,
        Humanities63_G6P4,
        Humanities64_G6P4,
        Math62_G6P4,
        // 7th grade classes
        Humanities72_G7P1,
        ReinosoAdvisory_G7P2,
        AlvarezAdvisory_G7P2,
        Math74_G7P1,
        Math73_G7P1,
        Science73_G7P3,
        MathSkills72_G7P3,
        Math71_G7P4,
        Math72_G7P4,
        Humanities74_G7P4,
        Humanities73_G7P4,
        // 8th grade classes
        Humanities81_G8P1,
        SuppoAdvisory_G8P2,
        BakerAdvisory_G8P2,
        SchoonmakerAdvisory_G8P2,
        PagoulatosAdvisory_G8P2,
        Mindfullness_G8P2,
        Science81_G8P3,
        Science82_G8P3,
        Humanities83_G8P4,
        Spanish1_G8P6,
        Spanish2_G8P6,
        Humanities85_G8P1
    ] = await Promise.all(classesList.map((eachClass) => Class.create(eachClass)));

    //-------------create all userClass relationships here-------------//
    const userClassList = [
        // Melvin Rosado schedule
        {userId:MelvinRosado.id,classId:ELA_G12P1.id},
        {userId:MelvinRosado.id,classId:ELA_G9P3.id},
        {userId:MelvinRosado.id,classId:RosadoAdvisory_G9P4.id},
        {userId:MelvinRosado.id,classId:Spanish1_G8P6.id},
        {userId:MelvinRosado.id,classId:HSLunch_P5.id},

        // Jack Padalino schedule
        {userId:JackPadalino.id,classId:APCSP_G11P1.id},
        {userId:JackPadalino.id,classId:PadalinoAdvisory_G12P2.id},
        {userId:JackPadalino.id,classId:IntroCS1_G10P3.id},
        {userId:JackPadalino.id,classId:APCSP_G12P6.id},
        {userId:JackPadalino.id,classId:Physics_G9P7.id},
        {userId:JackPadalino.id,classId:HSLunch_P5.id},

        // Teah Watson schedule
        {userId:TeahWatson.id,classId:EconGov_G12P1.id},
        {userId:TeahWatson.id,classId:MusicProduction_G11P4.id},
        {userId:TeahWatson.id,classId:WatsonAdvisory_G12P2.id},
        {userId:TeahWatson.id,classId:EconGov_G12P4.id},
        {userId:TeahWatson.id,classId:EconGov_G12P7.id},
        {userId:TeahWatson.id,classId:HSLunch_P5.id},

        // James Quinn schedule
        {userId:JamesQuinn.id,classId:APCSP_G11P1.id},
        {userId:JamesQuinn.id,classId:TechCareers_G11P2.id},
        {userId:JamesQuinn.id,classId:IntroCS2_G10P3.id},
        {userId:JamesQuinn.id,classId:HSLunch_P5.id},
        
        // Bismarck Oppong schedule
        {userId:BismarckOppong.id,classId:OppongAdvisory_G9P4.id},
        {userId:BismarckOppong.id,classId:LivingEnvironment_G10P6.id},
        {userId:BismarckOppong.id,classId:LivingEnvironment_G10P7.id},
        {userId:BismarckOppong.id,classId:Science82_G8P3.id},
        {userId:BismarckOppong.id,classId:HSLunch_P5.id},

        // Ross Chodan schedule
        {userId:RossChodan.id,classId:ELA_G11P1.id},
        {userId:RossChodan.id,classId:ELA_G11P3.id},
        {userId:RossChodan.id,classId:ELA_G11P7.id},
        {userId:RossChodan.id,classId:HSLunch_P5.id},

        // Jasmine Carsky schedule
        {userId:JasmineCarsky.id,classId:USHistory_G11P1.id},
        {userId:JasmineCarsky.id,classId:CarskyAdvisory_G12P2.id},
        {userId:JasmineCarsky.id,classId:USHistory_G11P3.id},
        {userId:JasmineCarsky.id,classId:USHistory_G11P7.id},
        {userId:JasmineCarsky.id,classId:HSLunch_P5.id},

        // Kelly Mobley schedule
        {userId:KellyMobley.id,classId:ELA_G10P2.id},
        {userId:KellyMobley.id,classId:ELA_G11P7.id},
        {userId:KellyMobley.id,classId:HSLunch_P5.id},

        // Lisa Lyons schedule
        {userId:LisaLyons.id,classId:LyonsAdvisory_G11P2.id},
        {userId:LisaLyons.id,classId:ELA_G9P3.id},
        {userId:LisaLyons.id,classId:ArtFundamentals_G9P4.id},
        {userId:LisaLyons.id,classId:ELA_G9P6.id},
        {userId:LisaLyons.id,classId:ELA_G9P7.id},
        {userId:LisaLyons.id,classId:HSLunch_P5.id},

        // Michelle Stover schedule
        {userId:MichelleStover.id,classId:LivingEnvironment_G10P1.id},
        {userId:MichelleStover.id,classId:Science81_G8P3.id},
        {userId:MichelleStover.id,classId:HSLunch_P5.id},

        // Asatou Sohna schedule
        {userId:AsatouSohna.id,classId:GlobalHistory_G9P1.id},
        {userId:AsatouSohna.id,classId:Photography_G12P2.id},
        {userId:AsatouSohna.id,classId:Photography_G11P2.id},
        {userId:AsatouSohna.id,classId:SohnaAdvisory_G10P3.id},
        {userId:AsatouSohna.id,classId:Painting_G10P4.id},
        {userId:AsatouSohna.id,classId:Painting_G11P4.id},
        {userId:AsatouSohna.id,classId:GlobalHistory_G9P7.id},
        {userId:AsatouSohna.id,classId:HSLunch_P5.id},

        // Chaka Baker schedule
        {userId:ChakaBaker.id,classId:Math73_G7P1.id},
        {userId:ChakaBaker.id,classId:BakerAdvisory_G8P2.id},
        {userId:ChakaBaker.id,classId:MathSkills61_G6P3.id},
        {userId:ChakaBaker.id,classId:Math71_G7P4.id},
        {userId:ChakaBaker.id,classId:MSLunch_P5.id},

        // Joe Suppo schedule
        {userId:JoeSuppo.id,classId:Humanities81_G8P1.id},
        {userId:JoeSuppo.id,classId:SuppoAdvisory_G8P2.id},
        {userId:JoeSuppo.id,classId:AIR64_G6P2.id},
        {userId:JoeSuppo.id,classId:Humanities83_G8P4.id},
        {userId:JoeSuppo.id,classId:MSLunch_P5.id},
        
        // Matthew Schoonmaker schedule
        {userId:MattSchoonmaker.id,classId:Math74_G7P1.id},
        {userId:MattSchoonmaker.id,classId:SchoonmakerAdvisory_G8P2.id},
        {userId:MattSchoonmaker.id,classId:Science73_G7P3.id},
        {userId:MattSchoonmaker.id,classId:Math72_G7P4.id},
        {userId:MattSchoonmaker.id,classId:MSLunch_P5.id},

        // Chikudi Richardson schedule
        {userId:ChikudiRichardson.id,classId:Math73_G7P1.id},
        {userId:ChikudiRichardson.id,classId:RichardsonAdvisory_G6P2.id},
        {userId:ChikudiRichardson.id,classId:Math65_G6P3.id},
        {userId:ChikudiRichardson.id,classId:Math65_G6P4.id},
        {userId:ChikudiRichardson.id,classId:MSLunch_P5.id},

        // Shira Collado schedule
        {userId:ShiraCollado.id,classId:Humanities72_G7P1.id},
        {userId:ShiraCollado.id,classId:ColladoAdvisory_G6P2.id},
        {userId:ShiraCollado.id,classId:AIR63_G6P2.id},
        {userId:ShiraCollado.id,classId:Humanities73_G7P4.id},
        {userId:ShiraCollado.id,classId:MSLunch_P5.id},

        // Virginia Ford schedule
        {userId:VirginiaFord.id,classId:AIR62_G6P2.id},
        {userId:VirginiaFord.id,classId:FordAdvisory_G6P2.id},
        {userId:VirginiaFord.id,classId:Humanities63_G6P4.id},
        {userId:VirginiaFord.id,classId:MSLunch_P5.id},

        // Rita Reinoso schedule
        {userId:RitaReinoso.id,classId:Humanities85_G8P1.id},
        {userId:RitaReinoso.id,classId:ReinosoAdvisory_G7P2.id},
        {userId:RitaReinoso.id,classId:Humanities64_G6P4.id},
        {userId:RitaReinoso.id,classId:Spanish2_G8P6.id},
        {userId:RitaReinoso.id,classId:MSLunch_P5.id},

        // Lena Pagoulatos schedule
        {userId:LenaPagoulatos.id,classId:Humanities65_G6P1.id},
        {userId:LenaPagoulatos.id,classId:PagoulatosAdvisory_G8P2.id},
        {userId:LenaPagoulatos.id,classId:Mindfullness_G8P2.id},
        {userId:LenaPagoulatos.id,classId:Humanities74_G7P4.id},
        {userId:LenaPagoulatos.id,classId:MSLunch_P5.id},

        // Melissa Alvarez schedule
        {userId:MelissaAlvarez.id,classId:Math63_G6P1.id},
        {userId:MelissaAlvarez.id,classId:AlvarezAdvisory_G7P2.id},
        {userId:MelissaAlvarez.id,classId:MathSkills72_G7P3.id},
        {userId:MelissaAlvarez.id,classId:Math62_G6P4.id},
        {userId:MelissaAlvarez.id,classId:MSLunch_P5.id},
        
    ];

    await Promise.all(userClassList.map((userClass) => UserClass.create(userClass)));

    //-------------create all days here-------------//
    const dayList = [
        {date:'2022-12-16'},
        {date:'2022-12-19'},
        {date:'2022-12-20'},
        {date:'2022-12-21'},
        {date:'2022-12-22'},
        {date:'2022-12-23'}
    ];

    const [
        December162022,
        December192022,
        December202022,
        December212022,
        December222022,
        December232022,
    ] = await Promise.all(dayList.map((day) => Day.create(day)));

    //-------------create all asbences here-------------//
    const absenceList = [
        // December 16 2022 absences
        {userId:JackPadalino.id,dayId:December162022.id},
        {userId:ShiraCollado.id,dayId:December162022.id},
        // December 19 2022 absences
        {userId:ChakaBaker.id,dayId:December192022.id},
        {userId:LisaLyons.id,dayId:December192022.id},
        // December 20 2022 absences
        {userId:TeahWatson.id,dayId:December202022.id},
        {userId:RitaReinoso.id,dayId:December202022.id},
        // December 21 2022 absences
        //{userId:ChikudiRichardson.id,dayId:December212022.id},
        {userId:VirginiaFord.id,dayId:December212022.id},
    ];

    await Promise.all(absenceList.map((absence) => Absence.create(absence)));

    console.log("DB SEED COMPLETE.");

};
  
seed();
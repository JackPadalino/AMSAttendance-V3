import axios from 'axios';
import React, { useState } from 'react';
import { setAllClasses } from "../../../store/classSlice";
import { useDispatch } from "react-redux";
import { 
    SchoolSelect,
    GradeSelect,
    PeriodSelect,
    LetterDaysSelect
} from '.'

const formStyle = {
    display:'flex',
    flexDirection:'column',
    gap:'10px'
};

const CreateClassForm = () => {
    const dispatch = useDispatch();
    const [className,setClassName] = useState('');
    const [school,setSchool] = useState('');
    const [grade,setGrade] = useState('');
    const [period,setPeriod] = useState('');
    const [letterDays,setLetterDays] = useState([]);
    const [successMessage,setSuccessMessage] = useState(false);
    
    const addClass = async(event) =>{
        event.preventDefault();
        const body = {
            className,
            school,
            grade,
            period,
            letterDays
        };
        await axios.post(`/api/classes`,body);
        const allClasses = await axios.get('/api/classes');
        dispatch(setAllClasses(allClasses.data));
        setSuccessMessage(true);
    };

    const handleNameChange = (event) =>{
        setClassName(event.target.value);
    };

    const handleSchoolChange = (event) =>{
        setSchool(event.target.value);
    };

    const handleGradeChange = (event) =>{
        setGrade(event.target.value);
    };

    const handlePeriodChange = (event) =>{
        setPeriod(event.target.value);
    };

    // adding a letter day to the letterDays array if not present or removing if present
    const handleLetterDaysChange =(event)=>{
        if(letterDays.includes(event.target.value)){
            setLetterDays(letterDays.filter(day=>day!==event.target.value))
        }else{
            setLetterDays([...letterDays,event.target.value]);
        };
    };

    return (
        <>
            <h1>Add a class</h1>
            <form onSubmit={addClass} style={formStyle}>
                <div>
                    <input placeholder="Class name" onChange={handleNameChange}/>
                    <SchoolSelect handleSchoolChange={handleSchoolChange}/>
                    <GradeSelect handleGradeChange={handleGradeChange}/>
                    <PeriodSelect handlePeriodChange={handlePeriodChange}/>
                </div>
                <div>
                    <LetterDaysSelect handleLetterDaysChange={handleLetterDaysChange}/>
                </div>
                <button style={{width:'60px'}}>Submit</button>
                {successMessage && <p style={{ color: "green", marginTop: "10px" }}>Class '{className}' successfully created.</p>}
            </form>
        </>
    );
};

export default CreateClassForm;
import axios from 'axios';
import React, { useState } from 'react';
import { setAllClasses } from "../../../store/classSlice";
import { useDispatch } from "react-redux";
import { 
    SchoolSelect,
    GradeSelect,
    PeriodSelect,
    LetterDaysSelect,
    Teacher1Select,
    Teacher2Select } from '.'

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
    const [teacher1Name,setTeacher1Name] = useState('');
    const [teacher2Name,setTeacher2Name] = useState('');
    const [teacherNames,setTeacherNames] = useState(['','']);
    const [duplicateTeacherNameMessage,setDuplicateTeacherNameMessage] = useState(false);
    const [successMessage,setSuccessMessage] = useState(false);
    
    const addClass = async(event) =>{
        event.preventDefault();
        if(!duplicateTeacherNameMessage){
            const body = {
                className,
                school,
                grade,
                period,
                letterDays,
                teacherNames
            };
            await axios.post(`/api/classes`,body);
            const allClasses = await axios.get('/api/classes');
            dispatch(setAllClasses(allClasses.data));
            setSuccessMessage(true);
        };
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

    const handleTeacher1Change = (event) =>{
        event.target.value===teacher2Name ? setDuplicateTeacherNameMessage(true) : setDuplicateTeacherNameMessage(false);
        setTeacher1Name(event.target.value);
        setTeacherNames([event.target.value,teacher2Name]);
    };

    const handleTeacher2Change = (event) =>{
        event.target.value===teacher1Name ? setDuplicateTeacherNameMessage(true) : setDuplicateTeacherNameMessage(false);
        setTeacher2Name(event.target.value);
        setTeacherNames([teacher1Name,event.target.value]);
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
                <div>
                    <Teacher1Select handleTeacher1Change={handleTeacher1Change}/>
                    <Teacher2Select handleTeacher2Change={handleTeacher2Change}/>
                </div>
                {duplicateTeacherNameMessage ? <p style={{ color: "red", marginTop: "10px" }}>Warning: Duplicate teacher selected!</p> : <button style={{width:'60px'}}>Submit</button>}
                {successMessage && <p style={{ color: "green", marginTop: "10px" }}>Class '{className}' successfully created.</p>}
            </form>
        </>
    );
};

export default CreateClassForm;
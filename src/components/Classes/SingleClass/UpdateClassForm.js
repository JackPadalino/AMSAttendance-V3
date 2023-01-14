import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

const UpdateClassForm = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [thisClass,setThisClass] = useState({});
    const [className,setClassName] = useState('');
    const [school,setSchool] = useState('');
    const [grade,setGrade] = useState('');
    const [period,setPeriod] = useState('');
    const [letterDays,setLetterDays] = useState([]);
    const [teacher1Id,setTeacher1Id] = useState('');
    const [teacher2Id,setTeacher2Id] = useState('');
    const [teacherIds,setTeacherIds] = useState(['','']);
    const [duplicateTeacherIdMessage,setDuplicateTeacherIdMessage] = useState(false);
    const [successMessage,setSuccessMessage] = useState(false);
    
    const fetchClass = async() =>{
        const foundClass = await axios.get(`/api/classes/${id}`);
        setThisClass(foundClass.data);
        setClassName(foundClass.data.name);
        setSchool(foundClass.data.school);
        setGrade(foundClass.data.grade);
        setPeriod(foundClass.data.period);
        setLetterDays(foundClass.data.letterDays);
        if(foundClass.data.users[0]) setTeacher1Id(foundClass.data.users[0].id);
        if(foundClass.data.users[1]) setTeacher2Id(foundClass.data.users[1].id);
    };

    useEffect(() => {
        fetchClass();
      }, []);

    const updateClass = async(event) =>{
        event.preventDefault();
        if(!duplicateTeacherIdMessage){
            const body = {
                className,
                school,
                grade,
                period,
                letterDays,
                teacherIds
            };
            await axios.put(`/api/classes/${id}`,body);
            const allClasses = await axios.get(`/api/classes`);
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
        event.target.value===teacher2Id ? setDuplicateTeacherIdMessage(true) : setDuplicateTeacherIdMessage(false);
        setTeacher1Id(event.target.value);
        setTeacherIds([event.target.value,teacher2Id]);
    };

    const handleTeacher2Change = (event) =>{
        event.target.value===teacher1Id ? setDuplicateTeacherIdMessage(true) : setDuplicateTeacherIdMessage(false);
        setTeacher2Id(event.target.value);
        setTeacherIds([teacher1Id,event.target.value]);
    };

    return (
        <>
            <h1>{className}</h1>
            <form onSubmit={updateClass} style={formStyle}>
                <div>
                    <input value={className} onChange={handleNameChange}/>
                    <SchoolSelect school={school} handleSchoolChange={handleSchoolChange}/>
                    <GradeSelect grade={grade} handleGradeChange={handleGradeChange}/>
                    <PeriodSelect period={period} handlePeriodChange={handlePeriodChange}/>
                </div>
                <div>
                    <LetterDaysSelect letterDays={letterDays} handleLetterDaysChange={handleLetterDaysChange}/>
                </div>
                <div>
                    <Teacher1Select teacher1Id={teacher1Id} handleTeacher1Change={handleTeacher1Change}/>
                    <Teacher2Select teacher2Id={teacher2Id} handleTeacher2Change={handleTeacher2Change}/>
                </div>
                {duplicateTeacherIdMessage ? <p style={{ color: "red", marginTop: "10px" }}>Warning: Duplicate teacher selected!</p> : <button style={{width:'60px'}}>Update</button>}
                {successMessage && <p style={{ color: "green", marginTop: "10px" }}>Class '{className}' successfully updated.</p>}
            </form>
        </>
    );
};

export default UpdateClassForm;
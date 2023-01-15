import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NotFoundPage } from "..";
import { TeacherSelect } from './';
import { setCoverageDate,setCoverageLetterDay,setAllAbsentUsers,setCoveredClasses } from "../../store/coverageSlice";
import { useSelector, useDispatch } from "react-redux";

const CoveragesPage = () => {
    const dispatch = useDispatch();
    const { coverageDate,coverageLetterDay,allAbsentUsers,coveredClasses } = useSelector((state) => state.absence);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [absentUserId,setAbsentUserId] = useState({});
    
    const handleDateChange = async(event) => {
        event.preventDefault();
        // handling date
        const date = event.target.value;
        const year = date.slice(0,4);
        const month = parseInt(date.slice(5,7));
        const day = parseInt(date.slice(8,10));
        const newDate = `${year}-${month}-${day}`;
        dispatch(setSelectedDate(newDate));
        // getting absences
        const absences = await axios.get(`/api/attendance/absences/${newDate}`);
        const userPromises = absences.data.map(absence => axios.get(`/api/users/${absence.user.id}`));
        const userResponses = await Promise.all(userPromises);
        const userAbsences = userResponses.map(response => response.data);
        dispatch(setAllAbsentUsers(userAbsences)); // setting the global list of absent users in Redux store
    };

    const handleTeacherChange = async(event) =>{
        setAbsentUserId(event.target.value);
    };

    const createAbsence = async(event)=>{
        event.preventDefault();
        const body = {absentUserId,selectedDate};
        await axios.post('/api/attendance/absences',body);
        const absences = await axios.get(`/api/attendance/absences/${selectedDate}`);
        const userPromises = absences.data.map(absence => axios.get(`/api/users/${absence.user.id}`));
        const userResponses = await Promise.all(userPromises);
        const userAbsences = userResponses.map(response => response.data);
        dispatch(setAllAbsentUsers(userAbsences));
    };

    if(!token) return <NotFoundPage/>
    return (
        <div>
            <h1>Absences/Coverages</h1>
            <div>

            </div>
            <div>
                <h3>Absences {selectedDate}</h3>
                <TeacherSelect createAbsence={createAbsence} handleTeacherChange={handleTeacherChange}/>
                {allAbsentUsers.map((user) => {
                    return (
                        <div key={user.id}>
                            <p>{user.fullName}</p>
                            {/* <ul>
                                {user.classes.map((eachClass) =>{
                                    return (
                                        eachClass.letterDays.includes(letterDay) && <li key={eachClass.id}><Link to={`/coverages/${eachClass.id}/${eachClass.school}/${eachClass.period}/${letterDay}`}>{eachClass.name} - {eachClass.period}</Link></li>
                                    )
                                })}
                            </ul> */}
                        </div>  
                    );
                })}
            </div>
        </div>
    );
};

export default CoveragesPage;
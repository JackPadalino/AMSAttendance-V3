import axios from 'axios';
import React, { useState } from 'react';
import { useSelector,useDispatch } from "react-redux";
import { DateSelect,LetterDaySelect,TeacherSelect } from './';
import { NotFoundPage } from "..";
import { setAllAbsentUsers } from "../../store/coverageSlice";

const deleteButtonStyle = {
    height:'15px',
    width:'15px',
    textAlign:'center',
    fontSize:'10px',
    padding:'0px'
};

const nameStyle = {
    display:'flex',
    alignItems:'center',
    gap:'10px'
};

const CoveragesPage = () => {
    const dispatch = useDispatch()
    const { daySelected,coverageDay,allAbsentUsers } = useSelector((state) => state.coverage);
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    const deleteAbsence = async(event) => {
        await axios.delete(`/api/attendance/absences/${coverageDay.id}/${event.target.value}`);
        const absences = await axios.get(`/api/attendance/absences/${coverageDay.date}`);
        const userPromises = absences.data.map(absence => axios.get(`/api/users/${absence.user.id}`));
        const userResponses = await Promise.all(userPromises);
        const userAbsences = userResponses.map(response => response.data);
        dispatch(setAllAbsentUsers(userAbsences)); // setting the global list of absent users in Redux store
    };

    if(!token) return <NotFoundPage/>
    return (
        <div>
            <h1>Absences/Coverages</h1>
            <div>
                <DateSelect/>
            </div>
            {daySelected && !coverageDay.id && <div>
                <p style={{color:'red'}}>No information about this date. Please select a letter day to get started.</p>
                <LetterDaySelect/>
            </div>}
            {daySelected && coverageDay.id && <div>
                <h1>{coverageDay.date} {coverageDay.letterDay} day</h1>
                <div>
                    <h3>Absences today</h3>
                    <div>
                        <TeacherSelect />
                    </div>
                    {allAbsentUsers.map((user) => {
                        return (
                            <div key={user.id}>
                                <div style={nameStyle}>
                                    <p>{user.fullName}</p>
                                    <button value={user.id} onClick={deleteAbsence} style={deleteButtonStyle} >x</button>
                                </div>
                                <ul>
                                    {user.classes.map((eachClass) =>{
                                        return (
                                            eachClass.letterDays.includes(coverageDay.letterDay) && <li key={eachClass.id}>{eachClass.name} - {eachClass.period}</li>
                                        )
                                    })}
                                </ul>
                            </div>  
                        );
                    })}
                </div>
            </div>}
        </div>
    );
};

export default CoveragesPage;
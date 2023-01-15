import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NotFoundPage } from "..";
import { setCoverageDate,setCoverageLetterDay,setAllAbsentUsers,setCoveredClasses } from "../../store/coverageSlice";
import { useSelector, useDispatch } from "react-redux";

const Absences = () => {
    const dispatch = useDispatch();
    const { coverageDate,coverageLetterDay,allAbsentUsers,coveredClasses } = useSelector((state) => state.coverage);
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        const year = selectedDate.slice(0,4);
        const month = parseInt(selectedDate.slice(5,7));
        const day = parseInt(selectedDate.slice(8,10));
        const finalDate = `${year}-${month}-${day}`
        dispatch(setCoverageDate(finalDate));
    };

    const handleLetterDayChange = (event) =>{
        const newLetterDay = event.target.value;
        dispatch(setCoverageLetterDay(newLetterDay));
    };

    const getAbsences = async(event) =>{
        event.preventDefault();
        const absences = await axios.get(`/api/attendance/absences/${date}`);
        const userPromises = absences.data.map(absence => axios.get(`/api/users/${absence.user.id}`));
        const userResponses = await Promise.all(userPromises);
        const userAbsences = userResponses.map(response => response.data);
        dispatch(setAllAbsentUsers(userAbsences)); // setting the global list of absent users in Redux store
    };

    if(!token) return <NotFoundPage/>
    return (
        <div>
            <h1>Absences {date}</h1>
            <form onSubmit={getAbsences}>
                <label htmlFor="date">Date</label>
                <input type="date" id="date" value={date} onChange={handleDateChange}></input>
                <label htmlFor="letter day">Letter day</label>
                <select name="letter day" id="letter day" value={coverageDate} onChange={handleLetterDayChange}>
                    <option value="-">-</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                </select>
                <input type='submit' value='Submit'/>
            </form>
            <div>
                {allAbsentUsers.map((user) => {
                    return (
                        <div key={user.id}>
                            <p>{user.fullName}</p>
                            <ul>
                                {user.classes.map((eachClass) =>{
                                    return (
                                        eachClass.letterDays.includes(coverageLetterDay) && <li key={eachClass.id}><Link to={`/coverages/${eachClass.id}/${eachClass.school}/${eachClass.period}/${letterDay}`}>{eachClass.name} - {eachClass.period}</Link></li>
                                    )
                                })}
                            </ul>
                        </div>  
                    );
                })}
            </div>
        </div>
    );
};

export default Absences;
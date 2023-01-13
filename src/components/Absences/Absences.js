import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NotFoundPage } from "..";
import { setDate,setLetterDay,setAllAbsentUsers,setCoveredClasses } from "../../store/absenceSlice";
import { useSelector, useDispatch } from "react-redux";

const Absences = () => {
    const dispatch = useDispatch();
    const { date,letterDay,coveredClasses } = useSelector((state) => state.absence);
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        const year = selectedDate.slice(0,4);
        const month = parseInt(selectedDate.slice(5,7));
        const day = parseInt(selectedDate.slice(8,10));
        const finalDate = `${year}-${month}-${day}`
        dispatch(setDate(finalDate));
    };

    const handleLetterDayChange = (event) =>{
        const newLetterDay = event.target.value;
        dispatch(setLetterDay(newLetterDay));
    };

    const getAbsences = async(event) =>{
        event.preventDefault();
        const absences = await axios.get(`/api/attendance/absences/${date}`);
        const userPromises = absences.data.map(absence => axios.get(`/api/users/${absence.user.id}`));
        const userResponses = await Promise.all(userPromises);
        const userAbsences = userResponses.map(response => response.data);
        const filteredClasses = userAbsences.map(eachUser => {
            const newObj = {user: eachUser, classes: []};
            eachUser.classes.forEach(eachClass => {
              if (eachClass.letterDays.includes(letterDay)) {
                newObj.classes.push(eachClass);
              }
            });
            return newObj;
          });
        dispatch(setCoveredClasses(filteredClasses));
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
                <select name="letter day" id="letter day" value={letterDay} onChange={handleLetterDayChange}>
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
                {coveredClasses.map((userObj) => {
                    return (
                        <div key={userObj.user.id}>
                            <p>{userObj.user.firstName} {userObj.user.lastName}</p>
                            <ul>
                                {userObj.classes.map((eachClass) =>{
                                    return (
                                        <li key={eachClass.id}><Link to={`/coverages/${eachClass.id}/${eachClass.school}/${eachClass.period}/${letterDay}`}>{eachClass.name} - {eachClass.period}</Link></li>
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
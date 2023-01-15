import axios from 'axios';
import React from 'react';
import { setCoverageDate,setCoverageLetterDay,setAllAbsentUsers } from "../../store/coverageSlice";
import { useSelector,useDispatch } from "react-redux";

const DateLetterDayForm = () => {
    const dispatch = useDispatch();
    const { coverageDate,coverageLetterDay } = useSelector((state) => state.coverage);

    const handleDateChange = async(event) => {
        event.preventDefault();
        // handling date
        const date = event.target.value;
        const year = date.slice(0,4);
        const month = parseInt(date.slice(5,7));
        const day = parseInt(date.slice(8,10));
        const newDate = `${year}-${month}-${day}`;
        dispatch(setCoverageDate(newDate));
        // getting absences
        const absences = await axios.get(`/api/attendance/absences/${newDate}`);
        const userPromises = absences.data.map(absence => axios.get(`/api/users/${absence.user.id}`));
        const userResponses = await Promise.all(userPromises);
        const userAbsences = userResponses.map(response => response.data);
        dispatch(setAllAbsentUsers(userAbsences)); // setting the global list of absent users in Redux store
    };

    const handleLetterDayChange = async(event)=>{
        event.preventDefault();
        dispatch(setCoverageLetterDay(event.target.value));
    }

    return (
        <form>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" value={coverageDate} onChange={handleDateChange}></input>
            <label htmlFor="letter day">Letter day</label>
            <select name="letter day" id="letter day" value={coverageLetterDay} onChange={handleLetterDayChange}>
                <option value="">-</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
            </select>
        </form>
    );
};

export default DateLetterDayForm;
import axios from 'axios';
import React from 'react';
import { setCoverageDate,setAllAbsentUsers } from "../../store/coverageSlice";
import { useSelector,useDispatch } from "react-redux";

const DateSelect = () => {
    const dispatch = useDispatch();
    const { coverageDate } = useSelector((state) => state.coverage);
    
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

    return (
        <form>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" value={coverageDate} onChange={handleDateChange}></input>
        </form>
    );
};

export default DateSelect;
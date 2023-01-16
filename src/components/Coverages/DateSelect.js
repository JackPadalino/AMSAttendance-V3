import axios from 'axios';
import React from 'react';
import { useSelector,useDispatch } from "react-redux";
import { setCoverageDay,setSelectedCoverageDate,setDaySelected,resetCoverageDay } from "../../store/coverageSlice";

const DateSelect = () => {
    const dispatch = useDispatch();
    const { coverageDay,selectedCoverageDate } = useSelector((state) => state.coverage);

    const handleDateChange = async(event) => {
        event.preventDefault();
        // handling date
        const selectedDate = event.target.value;
        dispatch(setDaySelected(true));
        dispatch(setSelectedCoverageDate(selectedDate));

        const year = selectedDate.slice(0,4);
        const month = parseInt(selectedDate.slice(5,7));
        const day = parseInt(selectedDate.slice(8,10));
        const date = `${year}-${month}-${day}`;

        // finding selected day in db
        const foundDay = await axios.get(`/api/day/${date}`);
        if(foundDay.data.id){
            dispatch(setCoverageDay(foundDay.data));
        }else{
            dispatch(resetCoverageDay());
        };
        // // getting absences
        // const absences = await axios.get(`/api/attendance/absences/${newDate}`);
        // const userPromises = absences.data.map(absence => axios.get(`/api/users/${absence.user.id}`));
        // const userResponses = await Promise.all(userPromises);
        // const userAbsences = userResponses.map(response => response.data);
        // dispatch(setAllAbsentUsers(userAbsences)); // setting the global list of absent users in Redux store
    };

    return (
        <form>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" value={selectedCoverageDate} onChange={handleDateChange}></input>
        </form>
    );
};

export default DateSelect;
import axios from 'axios';
import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setAllAbsentUsers, setCoverageDate } from "../../store/coverageSlice";

const TeacherSelect = () => {
    const dispatch = useDispatch();
    const { allUsers } = useSelector((state) => state.user);
    const { coverageDate,coverageLetterDay } = useSelector((state) => state.coverage);
    const [absentUserId,setAbsentUserId] = useState('');
    const [invalidEntry,setInvalidEntry] = useState(false);

    const handleTeacherChange = async(event) =>{
        setAbsentUserId(event.target.value);
    };

    const createAbsence = async(event)=>{
        event.preventDefault();
        if(coverageDate==='' || coverageLetterDay==='' || absentUserId===''){
            setInvalidEntry(true);
        }else{
            const body = {absentUserId,coverageDate,coverageLetterDay};
            await axios.post('/api/attendance/absences',body);
            const absences = await axios.get(`/api/attendance/absences/${coverageDate}`);
            const userPromises = absences.data.map(absence => axios.get(`/api/users/${absence.user.id}`));
            const userResponses = await Promise.all(userPromises);
            const userAbsences = userResponses.map(response => response.data);
            dispatch(setAllAbsentUsers(userAbsences));
            setInvalidEntry(false);
        };
    };

    return (
        <>
            <form onSubmit={createAbsence}>
                <label htmlFor="teacher">Teacher</label>
                <select name='teacher' onChange={handleTeacherChange}>
                    <option value=''>-</option>
                    {allUsers.map((user) => {
                        return (
                            <option key={user.id} value={user.id}>{user.fullName}</option>
                        );
                    })}
                </select>
                <input type='submit' value='Mark absent'/>
            </form>
            {invalidEntry && <p style={{color:'red'}}>Please select date, letter day, and teacher!</p>}
        </>
    );
};

export default TeacherSelect;
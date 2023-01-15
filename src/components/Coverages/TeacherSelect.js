import axios from 'axios';
import React, { useState } from 'react';
import { setAllAbsentUsers } from "../../store/coverageSlice";
import { useSelector, useDispatch } from "react-redux";

const TeacherSelect = () => {
    const dispatch = useDispatch();
    const { allUsers } = useSelector((state) => state.user);
    const { coverageDate } = useSelector((state) => state.coverage);
    const [absentUserId,setAbsentUserId] = useState({});

    const handleTeacherChange = async(event) =>{
        setAbsentUserId(event.target.value);
    };

    const createAbsence = async(event)=>{
        event.preventDefault();
        const body = {absentUserId,coverageDate};
        await axios.post('/api/attendance/absences',body);
        const absences = await axios.get(`/api/attendance/absences/${coverageDate}`);
        const userPromises = absences.data.map(absence => axios.get(`/api/users/${absence.user.id}`));
        const userResponses = await Promise.all(userPromises);
        const userAbsences = userResponses.map(response => response.data);
        dispatch(setAllAbsentUsers(userAbsences));
    };

    return (
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
    );
};

export default TeacherSelect;
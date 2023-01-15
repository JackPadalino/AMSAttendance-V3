import React from 'react';
import { useSelector } from "react-redux";

const TeacherSelect = ({scheduleAbsentUser,handleTeacherChange}) => {
    const { allUsers } = useSelector((state) => state.user);

    return (
        <>
            <label htmlFor="teacher">Teacher</label>
            <select name='teacher' value={scheduleAbsentUser.id} onChange={handleTeacherChange}>
                <option value=''>-</option>
                {allUsers.map((user) => {
                    return (
                        <option key={user.id} value={user.id}>{user.fullName}</option>
                    );
                })}
            </select>
        </>
    );
};

export default TeacherSelect;
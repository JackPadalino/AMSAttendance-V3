import React from 'react';
import { useSelector } from "react-redux";

const Teacher1Select = ({handleTeacher1Change}) => {
    const { allUsers } = useSelector((state) => state.user);

    return (
        <>
            <label htmlFor="teacher 1">Teacher</label>
            <select name='teacher 1' onChange={handleTeacher1Change}>
                <option value="">-</option>
                {allUsers.map((user) => {
                    return (
                        <option key={user.id} value={user.fullName}>{user.fullName}</option>
                    );
                })}
            </select>
        </>
    );
};

export default Teacher1Select;
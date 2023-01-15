import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { DateSelect,LetterDaySelect,TeacherSelect } from './';
import { NotFoundPage } from "..";

const CoveragesPage = () => {
    const { coverageDay,daySelected,allAbsentUsers } = useSelector((state) => state.coverage);
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    if(!token) return <NotFoundPage/>
    return (
        <div>
            <h1>Absences/Coverages</h1>
            <DateSelect/>
            {daySelected && !coverageDay.id && <p style={{color:'red'}}>No information about this date. Please select a letter day to get started.</p>}
            {daySelected && !coverageDay.id && <LetterDaySelect/>}
            <div>
                {coverageDay.id && <h1>{coverageDay.date} {coverageDay.letterDay} day</h1>}
                {/* <h3>Add an absence</h3> */}
                {/* <TeacherSelect /> */}
                {/* {allAbsentUsers.map((user) => {
                    return (
                        <div key={user.id}>
                            <p>{user.fullName}</p>
                            <ul>
                                {user.classes.map((eachClass) =>{
                                    return (
                                        eachClass.letterDays.includes(letterDay) && <li key={eachClass.id}><Link to={`/coverages/${eachClass.id}/${eachClass.school}/${eachClass.period}/${letterDay}`}>{eachClass.name} - {eachClass.period}</Link></li>
                                    )
                                })}
                            </ul>
                        </div>  
                    );
                })} */}
            </div>
        </div>
    );
};

export default CoveragesPage;
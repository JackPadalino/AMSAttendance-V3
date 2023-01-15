import React, { useState } from 'react';
import { NotFoundPage } from "..";
import { DateSelect,TeacherSelect } from './';
import { useSelector } from "react-redux";

const CoveragesPage = () => {
    const { coverageDate,allAbsentUsers } = useSelector((state) => state.coverage);
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    if(!token) return <NotFoundPage/>
    return (
        <div>
            <h1>Absences/Coverages</h1>
            <div>
                <DateSelect />
            </div>
            <div>
                <h3>Absences {coverageDate}</h3>
                <TeacherSelect />
                {allAbsentUsers.map((user) => {
                    return (
                        <div key={user.id}>
                            <p>{user.fullName}</p>
                            {/* <ul>
                                {user.classes.map((eachClass) =>{
                                    return (
                                        eachClass.letterDays.includes(letterDay) && <li key={eachClass.id}><Link to={`/coverages/${eachClass.id}/${eachClass.school}/${eachClass.period}/${letterDay}`}>{eachClass.name} - {eachClass.period}</Link></li>
                                    )
                                })}
                            </ul> */}
                        </div>  
                    );
                })}
            </div>
        </div>
    );
};

export default CoveragesPage;
import axios from 'axios';
import React,{ useState } from 'react';
import { useDispatch,useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { NotFoundPage } from "..";
import { TeacherSelect,LetterDaysSelect } from '.'
import { setScheduleDate,setScheduleLetterDay,setScheduleAbsentUser } from "../../store/scheduleSlice";

const SchedulePage = () => {
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const dispatch = useDispatch();
    const { scheduleAbsentUser,scheduleLetterDay } = useSelector((state) => state.schedule);

    const handleTeacherChange = async(event) =>{
        const user = await axios.get(`/api/users/${event.target.value}`)
        dispatch(setScheduleAbsentUser(user.data));
    };

    const handleLetterDayChange = (event) =>{
        dispatch(setScheduleLetterDay(event.target.value));
    };

    if(!token) return <NotFoundPage/>
    return (
        <div>
            <h1>Teacher schedules</h1>
            <TeacherSelect scheduleAbsentUser={scheduleAbsentUser} handleTeacherChange={handleTeacherChange}/>
            <LetterDaysSelect scheduleLetterDay={scheduleLetterDay} handleLetterDayChange={handleLetterDayChange}/>
            {scheduleAbsentUser.id && <div key={scheduleAbsentUser.id}>
                <ul>
                    {scheduleAbsentUser.classes.map((eachClass) =>{
                        return (
                            eachClass.letterDays.includes(scheduleLetterDay) && <li key={eachClass.id}>{eachClass.name} - {eachClass.period}</li>
                        )
                    })}
                </ul>
            </div>}
        </div>
    );
};

export default SchedulePage;
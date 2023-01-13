import axios from 'axios';
import React,{ useState } from 'react';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { NotFoundPage } from "../..";
import { TeacherSelect,LetterDaysSelect } from '.'

const SchedulePage = () => {
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const dispatch = useDispatch();
    const [user,setUser] = useState({});
    const [letterDay,setLetterDay] = useState('');
    const [classes,setClasses] = useState([]);

    const handleTeacherChange = async(event) =>{
        const user = await axios.get(`/api/users/${event.target.value}`)
        setUser(user.data);
        setClasses(user.data.classes);
    };

    const handleLetterDayChange = (event) =>{
        setLetterDay(event.target.value);
    };

    if(!token) return <NotFoundPage/>
    return (
        <div>
            <h1>Teacher schedules</h1>
            <TeacherSelect handleTeacherChange={handleTeacherChange}/>
            <LetterDaysSelect handleLetterDayChange={handleLetterDayChange}/>
            <div key={user.id}>
                <ul>
                    {classes.map((eachClass) =>{
                        return (
                            eachClass.letterDays.includes(letterDay) && <li key={eachClass.id}>{eachClass.name} - {eachClass.period}</li>
                        )
                    })}
                </ul>
            </div> 
        </div>
    );
};

export default SchedulePage;
import axios from 'axios';
import React,{ useState } from 'react';
import { useDispatch,useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { NotFoundPage } from "..";
import { TeacherSelect,LetterDaysSelect } from '.'
import { setSingleAbsentUser,setLetterDay } from "../../store/absenceSlice";

const SchedulePage = () => {
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const dispatch = useDispatch();
    const [user,setUser] = useState({});
    //const [letterDay,setLetterDay] = useState('');
    const [classes,setClasses] = useState([]);
    const { singleAbsentUser,letterDay } = useSelector((state) => state.absence);

    const handleTeacherChange = async(event) =>{
        const user = await axios.get(`/api/users/${event.target.value}`)
        dispatch(setSingleAbsentUser(user.data));
    };

    const handleLetterDayChange = (event) =>{
        dispatch(setLetterDay(event.target.value));
    };

    if(!token) return <NotFoundPage/>
    return (
        <div>
            <h1>Teacher schedules</h1>
            <TeacherSelect userName={singleAbsentUser.fullName} handleTeacherChange={handleTeacherChange}/>
            <LetterDaysSelect letterDay={letterDay} handleLetterDayChange={handleLetterDayChange}/>
            {/* <div key={singleAbsentUser.id}>
                <ul>
                    {singleAbsentUser.classes.map((eachClass) =>{
                        return (
                            eachClass.letterDays.includes(letterDay) && <li key={eachClass.id}><Link to={`/coverages/${eachClass.id}/${eachClass.school}/${eachClass.period}/${letterDay}`}>{eachClass.name} - {eachClass.period}</Link></li>
                        )
                    })}
                </ul>
            </div> */}
        </div>
    );
};

export default SchedulePage;
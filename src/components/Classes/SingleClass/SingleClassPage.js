import axios from 'axios';
import React,{ useState,useEffect } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { NotFoundPage } from "../..";
import { setAllClasses } from "../../../store/classSlice";

const formStyle = {
    display:'flex',
    flexDirection:'column',
    gap:'10px'
};

const SingleClassPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { allUsers } = useSelector((state) => state.user);

    const [className,setClassName] = useState('');
    const [school,setSchool] = useState('');
    const [grade,setGrade] = useState('');
    const [period,setPeriod] = useState('');
    const [letterDays,setLetterDays] = useState([]);
    const [users,setUsers] = useState([]);
    const [userId,setUserId] = useState('')

    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [loading,setLoading] = useState(true);
    const [successMessage,setSuccessMessage] = useState(false);
    const [confirmDeleteMessage,setConfirmDeleteMessage] = useState(false);

    const updateClass = async(event) =>{
        event.preventDefault();
        const body = {
            className,
            school,
            grade,
            period,
            letterDays,
            userId
        };
        await axios.put(`/api/classes/${id}`,body);
        const updateClass = await axios.get(`/api/classes/${id}`);
        setClassName(updateClass.data.name);
        setSchool(updateClass.data.school);
        setGrade(updateClass.data.grade);
        setPeriod(updateClass.data.period);
        setLetterDays(updateClass.data.letterDays);
        setUsers(updateClass.data.users);
        const allClasses = await axios.get(`/api/classes`);
        dispatch(setAllClasses(allClasses.data));
        setSuccessMessage(true);
    };

    const handleNameChange = (event) =>{
        setClassName(event.target.value);
    };

    const handleSchoolChange = (event) =>{
        setSchool(event.target.value);
    };

    const handleGradeChange = (event) =>{
        setGrade(event.target.value);
    };

    const handlePeriodChange = (event) =>{
        setPeriod(event.target.value);
    };

    // adding a letter day to the letterDays array if not present or removing if present
    const handleLetterDaysChange =(event)=>{
        if(letterDays.includes(event.target.value)){
            setLetterDays(letterDays.filter(day=>day!==event.target.value))
        }else{
            setLetterDays([...letterDays,event.target.value]);
        };
    };

    const handleTeacherChange = (event) =>{;
        setUserId(event.target.value);
    };
    
    const fetchClass = async() =>{
        setLoading(true);
        const foundClass = await axios.get(`/api/classes/${id}`);
        setClassName(foundClass.data.name);
        setSchool(foundClass.data.school);
        setGrade(foundClass.data.grade);
        setPeriod(foundClass.data.period);
        setLetterDays(foundClass.data.letterDays);
        setUsers(foundClass.data.users);
        setLoading(false);
    };

    useEffect(() => {
        fetchClass();
      }, []);

    const confirmDelete = () =>{
        confirmDeleteMessage ? setConfirmDeleteMessage(false) : setConfirmDeleteMessage(true);
    };

    const deleteClass = async()=> {
        await axios.delete(`/api/classes/${id}`);
        const updatedClasses = await axios.get('/api/classes');
        dispatch(setAllClasses(updatedClasses.data));
        navigate('/classes');
    };

    if(!token) return <NotFoundPage/>
    if(loading) return <p>Loading...</p>
    return (
        <div>
            <h1>{className}</h1>
            <form onSubmit={updateClass} style={formStyle}>
                <div>
                    <input value={className} onChange={handleNameChange}/>
                </div>
                <div>
                    <label htmlFor="school">MS/HS</label>
                    <select name='school' value={school} onChange={handleSchoolChange}>
                        <option value="-">-</option>
                        <option value="MS">MS</option>
                        <option value="HS">HS</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="grade">Grade</label>
                    <select name='grade' value={grade} onChange={handleGradeChange}>
                        <option value="-">-</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="period">Period</label>
                    <select name='period' value={period} onChange={handlePeriodChange}>
                        <option value="-">-</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                    </select>
                </div>
                <div>
                    <label>Letter days</label>
                    {letterDays.includes('A') ? <input type="checkbox" name="A day" value="A" onChange={handleLetterDaysChange} checked={true}/> :
                    <input type="checkbox" name="A day" value="A" onChange={handleLetterDaysChange}/>}
                    <label htmlFor="A day">A</label>

                    {letterDays.includes('B') ? <input type="checkbox" name="B day" value="B" onChange={handleLetterDaysChange} checked={true}/> :
                    <input type="checkbox" name="B day" value="B" onChange={handleLetterDaysChange}/>}
                    <label htmlFor="B day">B</label>

                    {letterDays.includes('C') ? <input type="checkbox" name="C day" value="C" onChange={handleLetterDaysChange} checked={true}/> :
                    <input type="checkbox" name="C day" value="C" onChange={handleLetterDaysChange}/>}
                    <label htmlFor="C day">C</label>

                    {letterDays.includes('D') ? <input type="checkbox" name="D day" value="D" onChange={handleLetterDaysChange} checked={true}/> :
                    <input type="checkbox" name="D day" value="D" onChange={handleLetterDaysChange}/>}
                    <label htmlFor="D day">D</label>

                    {letterDays.includes('E') ? <input type="checkbox" name="E day" value="E" onChange={handleLetterDaysChange} checked={true}/> :
                    <input type="checkbox" name="E day" value="E" onChange={handleLetterDaysChange}/>}
                    <label htmlFor="E day">E</label>

                    {letterDays.includes('F') ? <input type="checkbox" name="F day" value="F" onChange={handleLetterDaysChange} checked={true}/> :
                    <input type="checkbox" name="F day" value="F" onChange={handleLetterDaysChange}/>}
                    <label htmlFor="F day">F</label>
                </div>
                <div>
                    <label htmlFor='teachers'>Teachers</label>
                    <ul name='teachers'>
                        {users.map((user) => {
                        return (
                            <li key={user.id} value={user.id}>{user.fullName}</li>
                            );
                        })}
                    </ul>
                </div>
                <div>
                    <label htmlFor="teacher">Add a teacher</label>
                    <select name='teacher'onChange={handleTeacherChange}>
                        <option value=''>-</option>
                        {allUsers.map((user) => {
                            return (
                                <option key={user.id} value={user.id}>{user.fullName}</option>
                            );
                        })}
                    </select>
                </div>

                <button type='submit' style={{width:'56px'}}>Update</button>
            </form>
            {successMessage && <p style={{ color: "green", marginTop: "10px" }}>Class '{className}' successfully updated.</p>}
            {!confirmDeleteMessage && <button onClick={() => confirmDelete()}>Delete</button>}
            {confirmDeleteMessage && <p style={{color:'red'}}>Are you sure you want to delete this class?</p>}
            {confirmDeleteMessage && <button onClick={() => confirmDelete()}>Cancel</button>}
            {confirmDeleteMessage && <button onClick={() => deleteClass()}>Delete</button>}
        </div>
    );
};

export default SingleClassPage;
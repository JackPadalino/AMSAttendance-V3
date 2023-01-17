import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useNavigate,useParams,Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { NotFoundPage } from "..";
import { setCoverageDay,resetCoverageDay,setAllAbsentUsers } from "../../store/coverageSlice";

const SingleDay = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { coverageDay } = useSelector((state) => state.coverage);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [confirmDeleteMessage,setConfirmDeleteMessage] = useState(false);

    const [date,setDate] = useState(coverageDay.date);
    const [letterDay,setLetterDay] = useState(coverageDay.letterDay);

    const handleLetterDayChange = (event) =>{
        setLetterDay(event.target.value);
    };

    const updateDay = async(event) =>{
        event.preventDefault();
        try{
            const body = {
                date,
                letterDay
            };
            const updatedDay = await axios.put(`/api/day/${coverageDay.id}`,body);
            dispatch(setCoverageDay(updatedDay.data));
            navigate('/coverages');
        }catch(error){
            console.log(error);
        };
    };

    const confirmDelete = () =>{
        confirmDeleteMessage ? setConfirmDeleteMessage(false) : setConfirmDeleteMessage(true);
    };

    const deleteDay = async()=> {
        const absences = await axios.get(`/api/attendance/absences/${coverageDay.date}`);
        const userPromises = absences.data.map(absence => axios.get(`/api/users/${absence.user.id}`));
        const userResponses = await Promise.all(userPromises);
        const userAbsences = userResponses.map(response => response.data);
        dispatch(setAllAbsentUsers(userAbsences)); // setting the global list of absent users in Redux store
        await axios.delete(`/api/day/${coverageDay.id}`);
        dispatch(resetCoverageDay());
        navigate('/coverages');
    };

    if(!token) return <NotFoundPage/>
    return (
        <div>
            <h1>{coverageDay.date} {coverageDay.letterDay} day</h1>
            <form onSubmit={updateDay}>
                <label htmlFor="letter day">Letter day</label>
                <select name="letter day" id="letter day" value={letterDay} onChange={handleLetterDayChange}>
                    <option value="">-</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                </select>
                <button>Update</button>
            </form>
            {!confirmDeleteMessage && <button onClick={() => confirmDelete()}>Delete</button>}
            {confirmDeleteMessage && <p style={{color:'red'}}>Are you sure you want to delete this day?</p>}
            {confirmDeleteMessage && <button onClick={() => confirmDelete()}>Cancel</button>}
            {confirmDeleteMessage && <button onClick={() => deleteDay()}>Delete</button>}
        </div>
    );
};

export default SingleDay;
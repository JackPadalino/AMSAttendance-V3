import axios from 'axios';
import React,{ useState } from 'react';
import { useDispatch,useSelector } from "react-redux";
import { setCoverageDay } from "../../store/coverageSlice";

const LetterDaySelect = () => {
    const dispatch = useDispatch();
    const { selectedCoverageDate } = useSelector((state) => state.coverage);
    const [selectedLetterDay,setSelectedLetterDay] = useState('');

    const handleLetterDayChange = async(event)=>{
        event.preventDefault();
        setSelectedLetterDay(event.target.value);
    };

    const createNewDay = async(event) => {
        event.preventDefault();
        const year = selectedCoverageDate.slice(0,4);
        const month = parseInt(selectedCoverageDate.slice(5,7));
        const day = parseInt(selectedCoverageDate.slice(8,10));
        const date = `${year}-${month}-${day}`;
        const letterDay = selectedLetterDay;
        const body = {
            date,
            letterDay
        };
        await axios.post('/api/day',body);
        const foundDay = await axios.get(`/api/day/${date}`);
        if(foundDay.data.id){
            dispatch(setCoverageDay(foundDay.data));
        };
    };

    return (
        <form onSubmit={createNewDay}>
            <label htmlFor="letter day">Letter day</label>
            <select name="letter day" id="letter day" onChange={handleLetterDayChange}>
                <option value="">-</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
            </select>
            <input type='submit' value='Submit'/>
        </form>
    );
};

export default LetterDaySelect;
import React from 'react';
import { useSelector } from "react-redux";

const LetterDaysSelect = ({letterDay,handleLetterDayChange}) => {
    //const { letterDay } = useSelector((state) => state.absence);

    return (
            <>
                <select name="letter day" id="letter day" value={letterDay} onChange={handleLetterDayChange}>
                    <option value="-">-</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                </select>
            </>
    );
};

export default LetterDaysSelect;
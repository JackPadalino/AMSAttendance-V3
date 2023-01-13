import React from 'react';

const LetterDaysSelect = ({handleLetterDayChange}) => {
    return (
            <>
                <select name="letter day" id="letter day" onChange={handleLetterDayChange}>
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
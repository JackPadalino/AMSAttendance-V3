import React from 'react';

const LetterDaysSelect = ({letterDays,handleLetterDaysChange}) => {
    return (
        <>
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
        </>
    );
};

export default LetterDaysSelect;
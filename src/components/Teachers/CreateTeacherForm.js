import axios from 'axios';
import React, { useState } from 'react';
import { setAllUsers,addNewUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";

const CreateTeacherForm = () => {
    const dispatch = useDispatch();
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');

    const handleFirstNameChange = (event) =>{
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) =>{
        setLastName(event.target.value);
    };

    const handlePhoneNumberChange = (event) =>{
        setPhoneNumber(event.target.value);
    };

    const addTeacher = async(event) =>{
        event.preventDefault();
        const body = {
            firstName,
            lastName,
            phoneNumber
        };
        const newUser = await axios.post(`/api/users`,body);
        dispatch(addNewUser(newUser.data));
        const users = await axios.get(`/api/users`);
        dispatch(setAllUsers(users.data));
    };

    return (
        <>
            <h1>Add a teacher</h1>
            <form onSubmit={addTeacher}>
                <input placeholder="First name" name="first name" onChange={handleFirstNameChange}/>
                <input placeholder="Last name" name="last name" onChange={handleLastNameChange}/>
                <input placeholder="+1XXXXXXXXXX" name="phone number" onChange={handlePhoneNumberChange}/>
                <button>Submit</button>
            </form>
        </>
    );
};

export default CreateTeacherForm;
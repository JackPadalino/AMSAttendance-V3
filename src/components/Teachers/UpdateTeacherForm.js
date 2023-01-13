import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NotFoundPage } from "..";
import { useDispatch } from "react-redux";
import { setAllUsers } from "../../store/userSlice";

const UpdateTeacherForm = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [userUpdatedMessage,setUserUpdatedMessage] = useState(false);
    
    const fetchUser = async() =>{
        const foundUser = await axios.get(`/api/users/${id}`);
        setFirstName(foundUser.data.firstName);
        setLastName(foundUser.data.lastName);
        setPhoneNumber(foundUser.data.phoneNumber);
    };

    const handleFirstNameChange = (event) =>{
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) =>{
        setLastName(event.target.value);
    };

    const handlePhoneNumberChange = (event) =>{
        setPhoneNumber(event.target.value);
    };

    const updateTeacher = async(event) =>{
        event.preventDefault();
        try{
            const body = {
                firstName,
                lastName,
                phoneNumber
            };
            await axios.put(`/api/users/${id}`,body);
            const updatedUsers = await axios.get('/api/users');
            dispatch(setAllUsers(updatedUsers.data));
            setUserUpdatedMessage(true);
        }catch(error){
            console.log(error);
            setUserUpdatedMessage(false);
        };
    };

    useEffect(() => {
        fetchUser();
      }, []);

    return (
        <>
            <h1>Teacher profile</h1>
            <form onSubmit={updateTeacher}>
                <input value={firstName} onChange={handleFirstNameChange}/>
                <input value={lastName} onChange={handleLastNameChange}/>
                <input value={phoneNumber} onChange={handlePhoneNumberChange}/>
                <button>Submit</button>
            </form>
            {userUpdatedMessage && <p style={{ color: "green", marginTop: "10px" }}>Teacher successfully updated.</p>}
        </>
    );
};

export default UpdateTeacherForm;
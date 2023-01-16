import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NotFoundPage } from "..";
import { setAllUsers } from "../../store/userSlice";

const SingleTeacherPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [confirmDeleteMessage,setConfirmDeleteMessage] = useState(false);

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

    useEffect(() => {
        fetchUser();
    }, []);

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

    const confirmDelete = () =>{
        confirmDeleteMessage ? setConfirmDeleteMessage(false) : setConfirmDeleteMessage(true);
    };

    const deleteTeacher = async()=> {
        await axios.delete(`/api/users/${id}`);
        const updatedUsers = await axios.get('/api/users');
        dispatch(setAllUsers(updatedUsers.data));
        navigate('/teachers');
    };

    if(!token) return <NotFoundPage/>
    return (
        <div>
            <h1>Teacher profile</h1>
            <form onSubmit={updateTeacher}>
                <input value={firstName} onChange={handleFirstNameChange}/>
                <input value={lastName} onChange={handleLastNameChange}/>
                <input value={phoneNumber} onChange={handlePhoneNumberChange}/>
                <button>Submit</button>
            </form>
            {userUpdatedMessage && <p style={{ color: "green", marginTop: "10px" }}>Teacher successfully updated.</p>}
            {!confirmDeleteMessage && <button onClick={() => confirmDelete()}>Delete</button>}
            {confirmDeleteMessage && <p style={{color:'red'}}>Are you sure you want to delete this teacher?</p>}
            {confirmDeleteMessage && <button onClick={() => confirmDelete()}>Cancel</button>}
            {confirmDeleteMessage && <button onClick={() => deleteTeacher()}>Delete</button>}
        </div>
    );
};

export default SingleTeacherPage;
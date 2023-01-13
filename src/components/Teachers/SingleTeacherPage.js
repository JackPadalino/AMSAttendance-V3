import axios from 'axios';
import React,{ useState } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NotFoundPage } from "..";
import { UpdateTeacherForm } from ".";
import { setAllUsers } from "../../store/userSlice";

const SingleTeacherPage = () => {
    const { id } = useParams();
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [confirmDeleteMessage,setConfirmDeleteMessage] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            <div>
                <UpdateTeacherForm/>
            </div>
            {!confirmDeleteMessage && <button onClick={() => confirmDelete()}>Delete</button>}
            {confirmDeleteMessage && <p style={{color:'red'}}>Are you sure you want to delete this teacher?</p>}
            {confirmDeleteMessage && <button onClick={() => confirmDelete()}>Cancel</button>}
            {confirmDeleteMessage && <button onClick={() => deleteTeacher()}>Delete</button>}
        </div>
    );
};

export default SingleTeacherPage;
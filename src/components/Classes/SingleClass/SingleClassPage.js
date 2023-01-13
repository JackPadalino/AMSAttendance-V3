import axios from 'axios';
import React,{ useState } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NotFoundPage } from "../..";
import { UpdateClassForm } from '.'
import { setAllClasses } from "../../../store/classSlice";

const SingleClassPage = () => {
    const { id } = useParams();
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [confirmDeleteMessage,setConfirmDeleteMessage] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
    return (
        <div>
            <UpdateClassForm/>
            {!confirmDeleteMessage && <button onClick={() => confirmDelete()}>Delete</button>}
            {confirmDeleteMessage && <p style={{color:'red'}}>Are you sure you want to delete this class?</p>}
            {confirmDeleteMessage && <button onClick={() => confirmDelete()}>Cancel</button>}
            {confirmDeleteMessage && <button onClick={() => deleteClass()}>Delete</button>}
        </div>
    );
};

export default SingleClassPage;
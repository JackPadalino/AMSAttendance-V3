import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { NotFoundPage } from "..";
import { CreateTeacherForm } from ".";

const AllTeachersPage = () => {
    const { allUsers } = useSelector((state) => state.user);
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    if(!token) return <NotFoundPage/>
    return (
        <div>
            <div>
                <CreateTeacherForm/>
            </div>
            <div>
                <h1>All teachers</h1>
                {allUsers.map((user) => {
                    return (
                        <div key={user.id}>
                            <Link to={`/teachers/${user.id}`}>{user.firstName} {user.lastName}</Link>
                        </div>  
                    );
                })}
            </div>
        </div>
    );
};

export default AllTeachersPage;
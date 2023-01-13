import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NotFoundPage } from "../..";
import { useSelector } from "react-redux";
import { CreateClassForm } from '.'

const AllClassesPage = () => {
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const { allClasses } = useSelector((state) => state.class);
    
    if(!token) return <NotFoundPage/>
    return (
        <div>
            <div>
                <CreateClassForm />
            </div>
            <div>
                <h1>All classes</h1>
                {allClasses.map((eachClass) => {
                    return (
                        <div key={eachClass.id}>
                            <Link to={`/classes/${eachClass.id}`}>{eachClass.name}</Link>
                        </div>  
                    );
                })}
            </div>
        </div>
    );
};

export default AllClassesPage;
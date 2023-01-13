import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { NotFoundPage } from "..";

const AvailableCoverages = () => {
    const { classId,school,period,letter } = useParams();
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const { allUsers } = useSelector((state) => state.user);
    const { allAbsentUsers,letterDay } = useSelector((state) => state.absence);
    const [availableUsers,setAvailableUsers] = useState([]);
    const [thisClass,setThisClass] = useState({});
    let [thisClassUserIds,setThisClassUserIds] = useState([]);

    const fetchData = async() => {
        // fetching the class that needs coverage
        // finding what teachers already have that class assigned to them (finding teachers and coteachers)
        // making an array of the user ids for all co teachers of this class
        const thisClass = await axios.get(`/api/classes/${classId}`);
        setThisClass(thisClass.data);
        const thisClassUsers = thisClass.data.users;
        thisClassUserIds = thisClassUsers.map((user)=>user.id);
        setThisClassUserIds(thisClassUserIds);
        // fetching an array of all classes happening at this time
        // making an array of all busy teachers that are teaching during this period
        // making an array of all teachers that all teachers that are either busy OR are not co-teachers of that class
        // combining unavailable teachers with absent teachers
        const classes = await axios.get(`/api/classes/${school}/${period}/${letter}`);
        const busyUsers = classes.data.flatMap(eachClass => eachClass.users);
        const unAvailableUsers = busyUsers.filter((user)=>!thisClassUserIds.includes(user.id));
        const allUnAvailableUsers = [...allAbsentUsers,...unAvailableUsers];
        // making an array of all unique unavailable teacher ids
        // comparing the two user id arrays and making a final array of available user ids
        // we needed to make an array of ids so that we could filter out teachers who are not
        // available --> was not working when trying to directly filter entire teacher objects
        // this is because all objects are unique in memory even if key/value pairs are same
        // fetching all available teachers from their ids
        const allUserIds = allUsers.map((user)=>user.id);
        const allUnAvailableUserIds = allUnAvailableUsers.map((user)=>user.id);
        const availableUserIds = allUserIds.filter(id => !allUnAvailableUserIds.includes(id)); 
        const userPromises = availableUserIds.map(id => axios.get(`/api/users/${id}`));
        const userResponses = await Promise.all(userPromises);
        setAvailableUsers(userResponses.map(response => response.data));
      };

    useEffect(() => {
        fetchData();
    }, []);


    if(!token) return <NotFoundPage/>
    return (
        <div>
            <h1>Available coverages for {thisClass.school} {thisClass.name}{thisClass.grade} - Period {thisClass.period} - {letterDay} day</h1>
            <div>
                {availableUsers.map((user) => {
                    return (
                        user.role==='teacher' && <div key={user.id}>
                            {thisClassUserIds.includes(user.id) ? 
                            <p style={{'color':'red'}}><i>{user.firstName} {user.lastName}</i></p> : 
                            <p>{user.firstName} {user.lastName}</p>}
                            <ul>
                                {user.classes.map((eachClass)=>{
                                    return (
                                        eachClass.letterDays.includes(letterDay) && <li key={eachClass.id}>{eachClass.name} - P{eachClass.period}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default AvailableCoverages;
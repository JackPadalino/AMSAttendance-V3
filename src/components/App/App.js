import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Navbar, RouterComponent } from "..";
import { setUser,setAllUsers } from "../../store/userSlice";
import { setAllClasses } from "../../store/classSlice";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // Here we are checking to see if a user is already logged in upon refresh
  // If a token is present in local storage, we keep the user logged in
  const checkForUser = async () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/auth", {
        headers: {
          authorization: token,
        },
      });
      dispatch(setUser(response.data));
    }
  };

  const fetchClasses = async()=>{
    const response = await axios.get('/api/classes');
    dispatch(setAllClasses(response.data));
  };

  const fetchUsers = async()=>{
    const response = await axios.get('/api/users');
    dispatch(setAllUsers(response.data));
  };

  useEffect(() => {
    checkForUser();
    fetchClasses();
    fetchUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <RouterComponent />
    </div>
  );
};

export default App;

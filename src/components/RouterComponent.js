import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  // misc components
  Home,
  Login,
  // class components
  SingleClassPage,
  AllClassesPage,
  // absence components
  Absences,
  // teacher components
  SingleTeacherPage,
  AllTeachersPage,
  // coverage components
  CoveragesPage,
  AvailableCoverages,
  // schedule components
  SchedulePage
} from ".";

const RouterComponent = () => {

  return (
    <Routes>
      {/* misc routes */}
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />

      {/* class routes */}
      <Route exact path="/classes" element={<AllClassesPage />} />
      <Route exact path="/classes/:id" element={<SingleClassPage />} />

      {/* absence routes */}
      {/* <Route exact path="/absences" element={<Absences />} /> */}

      {/* teacher routes */}
      <Route exact path="/teachers" element={<AllTeachersPage />} />
      <Route exact path="/teachers/:id" element={<SingleTeacherPage />} />
      
      {/* coverage routes */}
      <Route exact path="/coverages" element={<CoveragesPage />}/>
      <Route exact path="/coverages/:classId/:school/:period/:letter" element={<AvailableCoverages />} />

      {/* schedule routes */}
      <Route exact path="/schedules" element={<SchedulePage />} />
    </Routes>
  );
};

export default RouterComponent;

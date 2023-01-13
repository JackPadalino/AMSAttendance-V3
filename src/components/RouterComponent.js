import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Absences,
  AllTeachersPage,
  AllClassesPage,
  AvailableCoverages,
  SingleTeacherPage,
  SingleClassPage,
  SchedulePage
} from ".";

const RouterComponent = () => {

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/absences" element={<Absences />} />
      <Route exact path="/teachers" element={<AllTeachersPage />} />
      <Route exact path="/teachers/:id" element={<SingleTeacherPage />} />
      <Route exact path="/classes" element={<AllClassesPage />} />
      <Route exact path="/classes/:id" element={<SingleClassPage />} />
      <Route exact path="/coverages/:classId/:school/:period/:letter" element={<AvailableCoverages />} />
      <Route exact path="/schedules" element={<SchedulePage />} />
    </Routes>
  );
};

export default RouterComponent;

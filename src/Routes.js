import React from 'react'
import ProjectUpdate from './pages/ProjectUpdate';
import Main from './pages/Main';
import Login from './pages/Login'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Display from './pages/Display';
import Resume from './pages/Resume';

const Routez = () => {
  return (
    <Router>
        <Routes>
            {/* <Route path='/' element={<Login/>}/> */}
            <Route path='/project/:id' element={<ProjectUpdate/>}/>
            <Route path='/display' element={<Display/>}/>
            <Route path='/' element={<Main/>}/>
            <Route path='/resume' element={<Resume/>}/>
        </Routes>
    </Router>
  )
}

export default Routez

import React from 'react'
import ProjectUpdate from './pages/ProjectUpdate';
import Main from './pages/Main';
import Login from './pages/Login'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const Routez = () => {
  return (
    <Router>
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/project/:id' element={<ProjectUpdate/>}/>
            <Route path='/main' element={<Main/>}/>
        </Routes>
    </Router>
  )
}

export default Routez

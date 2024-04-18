import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import {updateAll} from '../features/projectsSlice'

const ProjectsPage = () => {

  // UPDATE PROJECTS STATE VALUE
  const dispatch = useDispatch()


  // GET CURRENT STATE (PROJECTS) VALUE
  const projects = useSelector(
    (state) => state.projects.value
  );
  
  useEffect(()=>{
    async function fetchData(){
      const fetch = await fetch('https://myportfoliodb-56c35-default-rtdb.asia-southeast1.firebasedatabase.app/projects.json')
      const data = await fetch.json();
      dispatch(updateAll(data))
    }

    fetchData()
  },[])
  return (
    <div>
      {projects.length == 0 ? 'loading':
        <div>
          
        </div>
      }
    </div>
  )
}

export default ProjectsPage

import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { pushData,emptyData } from '../features/projectsSlice'
import {  useNavigate } from 'react-router-dom';
import { reset, update } from '../features/projectSlice';

const ProjectsPage = () => {
  const navigate = useNavigate()
  const [newe,setNew] = useState(0)
  const [url,setUrl]  =useState('/main')



  // UPDATE PROJECTS STATE VALUE
  const dispatch = useDispatch()


  // GET CURRENT STATE (PROJECTS) VALUE
  const projects = useSelector(
    (state) => state.projects
  );
  const project = useSelector(
    (state) => state.project
  );

  useEffect(() => {
    async function fetchData() {
      const resp = await fetch('https://myportfoliodb-56c35-default-rtdb.asia-southeast1.firebasedatabase.app/projects.json')
      const data = await resp.json();
      dispatch(emptyData())
      for(let i=0;i<data.length;i++){
        if(data[i]!=null){
          dispatch(pushData(data[i]))
        }
      }
    }
    fetchData()
  }, [])

  useEffect(()=>{
    setNew(projects.length + 1);
  },[projects])

  useEffect(() => {
    navigate(url)
}, [project]);

function UpdateProject(path, payload) {
  setUrl(path)
  dispatch(update(payload))
}

function Addproject(path) {
  setUrl(path)
  dispatch(reset())
}


  return (
    <>
    <div className="d-flex flex-row align-items-center">
    <h1>Projects</h1>
    <button className="btn btn-primary ms-5" onClick={()=>{Addproject(`/project/${newe}`)}}>Add Project</button>
    </div>
    <hr />
    <div>
      {projects.map((prj)=>(
        <div key={Number(prj.data.id)} className='p-2 border-0 '>
          <img src={prj.data.titlePictureURL} alt="Title Thumbnail" width={300}/>
          <h1>{prj.data.title}</h1>
          <p>{prj.data.tagLine}</p>
          <div className="d-flex">
              <button className='btn btn-primary'onClick={()=>UpdateProject(`/project/${prj.data.id}`,prj.data)}>Update</button>
            <button className='btn btn-primary ms-2' >Delete</button>
          </div>
        </div>
      ))}
  </div>
  </>
  )
}

export default ProjectsPage

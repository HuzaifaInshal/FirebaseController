import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { pushData,emptyData } from '../features/projectsSlice'
import {  useNavigate } from 'react-router-dom';
import { reset, update } from '../features/projectSlice';
import addDatatoDatabase from '../firebase/addData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

function changeActiveStatus(data){
  const mutableData = { ...data };
  console.log(mutableData);
  mutableData.isActive = !mutableData.isActive;
  console.log(mutableData);
  addDatatoDatabase(mutableData, `projects/${mutableData.id}`);
  toast('Submitted with Success')
}


  return (
    <>
    <ToastContainer/>
    <div className="d-flex flex-row align-items-center">
    <h1>Projects</h1>
    <button className="btn btn-primary ms-5" onClick={()=>{Addproject(`/project/${newe}`)}}>Add Project</button>
    </div>
    <hr />
    <div>
      {projects.map((prj)=>(
        <div key={Number(prj.data.id)} className='p-2 border-2 '>
          <img src={prj.data.titlePictureURL} alt="Title Thumbnail" width={300}/>
          <h1>{prj.data.title}</h1>
          <h4>{prj.data.tagLine}</h4>
          <p>{prj.data.isActive ? 'active' : 'unactive'}</p>
          <div className="d-flex">
              <button className='btn btn-primary'onClick={()=>UpdateProject(`/project/${prj.data.id}`,prj.data)}>Update</button>
            <button className='btn btn-primary ms-2' onClick={()=>changeActiveStatus(prj.data)}>{prj.data.isActive ? 'Deactivate' : 'Activate'}</button>
          </div>
        </div>
      ))}
  </div>
  </>
  )
}

export default ProjectsPage

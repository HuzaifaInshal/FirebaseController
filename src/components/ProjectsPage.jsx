import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { pushData } from '../features/projectsSlice'
import { Link } from 'react-router-dom';

const ProjectsPage = () => {
  const [newe,setNew] = useState(0)
  // UPDATE PROJECTS STATE VALUE
  const dispatch = useDispatch()


  // GET CURRENT STATE (PROJECTS) VALUE
  const projects = useSelector(
    (state) => state.projects
  );

  useEffect(() => {
    async function fetchData() {
      const resp = await fetch('https://myportfoliodb-56c35-default-rtdb.asia-southeast1.firebasedatabase.app/projects.json')
      const data = await resp.json();
      console.log(data);
      for(let i=0;i<data.length;i++){
        console.log(data[i]);
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

  return (
    <>
    <Link className="btn btn-primary" to={`/project/${newe}`}>Add Project</Link>
    <div>
      {projects.map((prj,index)=>(
        <div key={Number(prj.data.id)} className='p-2 border-0 '>
          <img src={prj.data.titlePictureURL} alt="Title Thumbnail" width={300}/>
          <h1>{prj.data.title}</h1>
          <p>{prj.data.tagLine}</p>
          <div className="d-flex">
              <Link className='btn btn-primary' to={`/project/${prj.data.id}`}>Update</Link>
            <button className='btn btn-primary ms-2' >Delete</button>
          </div>
        </div>
      ))}
  </div>
  </>
  )
}

export default ProjectsPage

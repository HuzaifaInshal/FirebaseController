import React from 'react'
import ProjectPage from '../components/ProjectsPage'
import Extras from '../components/Extras'

const Main = () => {
  return (
    <>
    <section className='border-0 container'>
      <div className="row">
        <div className="col-12 py-5">
          <ProjectPage/>
        </div>
      </div>
    </section>
    <section className='border-0 container'>
      <div className="row">
        <div className="col-12 py-5">
          <Extras/>
        </div>
      </div>
    </section>
    </>
  )
}

export default Main

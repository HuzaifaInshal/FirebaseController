import React from 'react'
import ProjectPage from '../components/ProjectsPage'
import Nav from '../components/Nav'

const Main = () => {
  return (
    <>
    <Nav params='main'/>
    <section className='border-0 container'>
      <div className="row">
        <div className="col-12 py-5">
          <ProjectPage/>
        </div>
      </div>
    </section>
    </>
  )
}

export default Main

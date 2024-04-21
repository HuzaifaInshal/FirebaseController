import React from 'react'
import Nav from '../components/Nav'
import DispComp from '../components/DispComp'

const Display = () => {
  return (
    <>
        <Nav params='display'/>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <DispComp/>
              </div>
            </div>
          </div>
        </section>
    </>
  )
}

export default Display

import React from 'react'
import addDatatoDatabase from '../firebase/addData';
import Form from '../components/Form';

const ProjectUpdate = () => {

    const updateData = () => {
        addDatatoDatabase()
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 py-5">
                        <Form/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectUpdate

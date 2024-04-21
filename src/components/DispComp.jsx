import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import addDatatoDatabase from '../firebase/addData';

const DispComp = () => {
    const [data, setData] = useState( {    
        skills: '',
        workExperience: [['', '', '','']],
        education: [['', '', '', '']],
        certifications:['']
    })
    useEffect(()=>{
        async function fetchData() {
            const resp = await fetch('https://myportfoliodb-56c35-default-rtdb.asia-southeast1.firebasedatabase.app/display.json')
            const data = await resp.json();
            setData(data.data)
        }
        fetchData()
    },[]);


    function handleSubmit(e) {
        e.preventDefault()
        console.log(data);
        addDatatoDatabase(data,`display`)
        toast('Submitted with Success')

    }

    function handleChange(e, index, num) {
        const array = data[`${e.target.name}`];
        array[index][num] = e.target.value;
        setData({ ...data, [`${e.target.name}`]: array })
    }

    function addNew(e){
        if(e.target.name == 'workExperience'){
            setData({...data,workExperience:[...data.workExperience,['','','','']]})
        }
        if(e.target.name == 'education'){
            setData({...data,education:[...data.education,['','','','']]})
        }
        if(e.target.name == 'certifications'){
            setData({...data,certifications:[...data.certifications,'']})
        }
    }

    function handleChange2(e,index){
        const newarray = data.certifications;
        newarray[index] = e.target.value;
        setData({...data,certifications:newarray})
    }
    return (
        <>
        <ToastContainer/>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <h2>Skills</h2>
                <input type="text" name='skills' value={data.skills} onChange={(e) => { setData({ ...data, skills: e.target.value }) }} />
                <hr />
                <div className="d-flex align-items-center">
                    <h2>Work Experience</h2>
                    <button type='button' className="btn btn-primary ms-3" name='workExperience' onClick={(e)=>addNew(e)}>Add Experience</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Duration</th>
                            <th>Title</th>
                            <th>Place</th>
                            <th>Special Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.workExperience.map((each, index) => (
                            <tr key={index}>
                                <td><input type="text" name='workExperience' value={each[0]} onChange={(e) => { handleChange(e, index, 0) }} /></td>
                                <td><input type="text" name='workExperience' value={each[1]} onChange={(e) => { handleChange(e, index, 1) }} /></td>
                                <td><input type="text" name='workExperience' value={each[2]} onChange={(e) => { handleChange(e, index, 2) }} /></td>
                                <td><input type="text" name='workExperience' value={each[3]} onChange={(e) => { handleChange(e, index, 3) }} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <hr />
                <div className="d-flex align-items-center">
                    <h2>Education</h2>
                    <button type='button' className="btn btn-primary ms-3" name='education' onClick={(e)=>addNew(e)}>Add Education</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Duration</th>
                            <th>Degree</th>
                            <th>Institute</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.education.map((each, index) => (
                            <tr key={index}>
                                <td><input type="text" name='education' value={each[0]} onChange={(e) => { handleChange(e, index, 0) }} /></td>
                                <td><input type="text" name='education' value={each[1]} onChange={(e) => { handleChange(e, index, 1) }} /></td>
                                <td><input type="text" name='education' value={each[2]} onChange={(e) => { handleChange(e, index, 2) }} /></td>
                                <td><input type="text" name='education' value={each[3]} onChange={(e) => { handleChange(e, index, 3) }} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <hr />
                <div>
                <div className="d-flex align-items-center">
                    <h2>Certifications</h2>
                    <button type='button' className="btn btn-primary ms-3" name='certifications' onClick={(e)=>addNew(e)}>Add Education</button>
                </div>
                    {data.certifications.map((each,index)=>(
                        <div>
                            <input type="text" value={data.certifications[index]} onChange={(e)=>handleChange2(e,index)}/>
                        </div>
                    ))}
                    </div>
                <hr />
                <button  type='submit' className='btn btn-primary'>Submit</button>
            </form>
        </>
    )
}

export default DispComp

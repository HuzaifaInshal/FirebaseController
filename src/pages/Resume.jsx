import React, { useState } from 'react'
import Nav from '../components/Nav';
import addFileToStorage from '../firebase/addFile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getImageURL from '../firebase/getImage';
import addDatatoDatabase from '../firebase/addData';

const Resume = () => {
    const [busy,setBusy] = useState(false)
    const [data,setData] = useState('')
    async function updateResume(e) {
        setBusy(true);
        const id = toast.loading("File Uploading....")
        const file = e.target.files[0];
        try {
            const filename = 'Huzaifa Resume'
            await addFileToStorage(file, filename);
            toast.update(id, { render: "File URL getting Ready" })
            const newName = await getImageURL(filename)
            setData(newName)
            toast.update(id, { render: "Uplaoded with success", type: "success", isLoading: false, autoClose: 3000 });
            setBusy(false);
        } catch (error) {
            console.error('Error adding file to storage:', error);
            toast.update(id, { render: "Something went wrong", type: "error", isLoading: false, autoClose: 3000 });
            e.target.value = '';
            setBusy(false);
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(data);
        addDatatoDatabase(data, 'HuzaifaResume')
        toast('Submitted with Success')
    }

    return (
        <>
            <ToastContainer />
            <Nav params='resume' />
            <section className='border-0 container'>
                <div className="row">
                    <div className="col-12 py-5">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="resume"></label>
                            <input type="file" name='resume' onChange={(e) => updateResume(e)} accept=".pdf" multiple={false} />
                            <button type='submit' className='btn btn-primary' disabled={busy ? true : false}>Submit</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Resume

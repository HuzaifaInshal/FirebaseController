import React, { useEffect, useRef, useState } from 'react'
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import addFileToStorage from '../firebase/addFile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getImageURL from '../firebase/getImage';
import addDatatoDatabase from '../firebase/addData';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Form = () => {
    const { id } = useParams();
    const dataFromState = useSelector(state => state.project)
    const [major, setMajor] = useState('work')
    const [formData, SetFormData] = useState(dataFromState);
    if (formData.id == 0) {
        SetFormData({ ...formData, ['id']: id })
    }
    const [busy, setBusy] = useState(false)

    // QUILL
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike', { 'list': 'ordered' }, { 'list': 'bullet' }, 'link', 'blockquote', 'code-block',
                { 'header': 1 }, { 'header': 2 }], [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean']
        ],
    };

    const { quill, quillRef } = useQuill({ modules });

    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                const html = quill.root.innerHTML;
                SetFormData(prevState => ({ ...prevState, blogFlow: html }));
            });
        }
    }, [quill]);

    useEffect(() => {
        if (quill) {
            quill.root.innerHTML = formData.blogFlow;
        }
    }, [quill]);


    function insertExternalImage(url) {
        const index = quill.getSelection(true).index;
        quill.insertEmbed(index, 'image', url);
    }

    // DYNAMIC FORM
    const addField = (str) => {
        SetFormData({ ...formData, [str]: [...formData[str], ''] })
    }

    function handleArrayChange(str, index, e) {
        const newArray = [...formData[str]];
        newArray[index] = e.target.value;
        SetFormData({ ...formData, [str]: newArray });
    }

    function handleChange(e) {
        SetFormData({ ...formData, [e.target.name]: `${e.target.value}` })
    }

    function handleDropDownChange(e) {
        SetFormData({ ...formData, ['type']: { ...formData.type, [e.target.name]: `${e.target.value}` } })
    }


    function handleDelete(e,index){
        const newArray = [...formData[e.target.name]];
        newArray.splice(index,1)
        SetFormData({ ...formData, [e.target.name]: newArray });
    }

    // SUBMIT FUNCTIONALITY
    function handleSubmit(e) {
        e.preventDefault()
        console.log(formData);
        addDatatoDatabase(formData, `projects/${formData.id}`)
        toast('Submitted with Success')
    }


    // IMAGE HANDLER
    async function handleImage(e) {
        const str = e.target.name;
        setBusy(true);
        const id = toast.loading("File Uploading....")
        const file = e.target.files[0];
        try {
            const filename = `${formData.title} ${file.name}`
            console.log(filename);
            await addFileToStorage(file, filename);
            toast.update(id, { render: "File URL getting Ready" })
            const newName = await getImageURL(filename)
            SetFormData({ ...formData, [str]: newName })
            toast.update(id, { render: "Uplaoded with success", type: "success", isLoading: false, autoClose: 3000 });
            setBusy(false);
        } catch (error) {
            console.error('Error adding file to storage:', error);
            toast.update(id, { render: "Something went wrong", type: "error", isLoading: false, autoClose: 3000 });
            e.target.value = '';
            setBusy(false);
        }
    }

    async function addImageTOBlog(e) {
        const str = e.target.name;
        setBusy(true);
        const id = toast.loading("File Uploading....")
        const file = e.target.files[0];
        try {
            const filename = `${formData.title} ${file.name}`
            console.log(filename);
            await addFileToStorage(file, filename);
            toast.update(id, { render: "File URL getting Ready" })
            const newName = await getImageURL(filename)
            insertExternalImage(newName);
            e.target.value = '';
            toast.update(id, { render: "Uplaoded with success", type: "success", isLoading: false, autoClose: 3000 });
            // toast.update(id, { render: "Uplaoded with success", type: "notify" });
            setBusy(false);
        } catch (error) {
            console.error('Error adding file to storage:', error);
            toast.update(id, { render: "Something went wrong", type: "error", isLoading: false, autoClose: 3000 });
            e.target.value = '';
            setBusy(false);
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <ToastContainer />

            <div className="mb-3">
                <label htmlFor="id" className="form-label">ID</label>
                <input type="text" className="form-control" name='id' disabled={true} value={formData.id} />
            </div>

            <div className="mb-3">
                <label htmlFor="major">Major Type</label>
                <select class="form-select" aria-label="Default select example" name='major'
                    onChange={(e) => handleDropDownChange(e)}>
                    <option value='work' selected>Work</option>
                    <option value="lab">Lab</option>
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="minor">Minor Type</label>
                <select class="form-select" aria-label="Default select example" name='minor'
                    onChange={(e) => handleDropDownChange(e)}>
                    {formData.type.major == 'work' ?
                        <>
                            <option value="web" selected>Web</option>
                            <option value="threed">3D</option>
                            <option value="game">Game</option>
                            <option value="mobile">Mobile</option>
                            <option value="uiux">UIUX</option>
                        </> :
                        <>
                            <option value="static" selected>Static webs</option>
                            <option value="dashboards">Data Dashboards</option>
                            <option value="jupyter">Jupyter Snaps</option>
                            <option value="codepens">Codepens</option>
                            <option value="other">Other</option>
                        </>}
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" value={formData.title} className="form-control" name='title' onChange={(e) => handleChange(e)} />
            </div>

            <div className="mb-3">
                <label htmlFor="tagLine" className="form-label">Tag Line</label>
                <input type="text" value={formData.tagLine} className="form-control" name='tagLine' onChange={(e) => handleChange(e)} />
            </div>

            <div className="mb-3">
                <label htmlFor="mainPara" className="form-label">Main Para</label>
                <input type="text" value={formData.mainPara} className="form-control" name='mainPara' onChange={(e) => handleChange(e)} />
            </div>

            <div className="mb-3 border-0">
                <label>Major Hashtags</label>
                <button className="btn btn-primary ms-2" onClick={() => addField('majorHashtags')} type='button'>Add</button>
                {formData.majorHashtags.map((element, index) => (
                    <div key={index} className='d-flex align-items-center'>
                    <input value={formData.majorHashtags[index]} type="text" className="form-control" onChange={(e) => handleArrayChange('majorHashtags', index, e)} />
                    <button className="btn btn-danger ms-2" type='button' name='majorHashtags' onClick={(e)=>handleDelete(e,index)}>Delete</button>
                    </div>
                ))}
            </div>

            <div className="mb-3 border-0">
                <label>Minor Hashtags</label>
                <button className="btn btn-primary ms-2" onClick={() => addField('minorHashtags')} type='button'>Add</button>
                {formData.minorHashtags.map((element, index) => (
                    <div key={index} className='d-flex align-items-center'>
                    <input key={index} type="text" value={formData.minorHashtags[index]} className="form-control" name={`minorHashtags${index}`} onChange={(e) => handleArrayChange('minorHashtags', index, e)} />
                    <button className="btn btn-danger ms-2" type='button' name='minorHashtags' onClick={(e)=>handleDelete(e,index)}>Delete</button>
                    </div>
                ))}
            </div>

            <div className="mb-3 border-0">
                <label>Git Links</label>
                <button className="btn btn-primary ms-2" onClick={() => addField('gitLinks')} type='button'>Add</button>
                {formData.gitLinks.map((element, index) => (
                    <div key={index} className='d-flex align-items-center'>
                    <input key={index} type="text" value={formData.gitLinks[index]} className="form-control" onChange={(e) => handleArrayChange('gitLinks', index, e)} />
                    <button className="btn btn-danger ms-2" type='button' name='gitLinks' onClick={(e)=>handleDelete(e,index)}>Delete</button>
                    </div>
                ))}
            </div>

            <div className="mb-3 border-0">
                <label>Live Links</label>
                <button className="btn btn-primary ms-2" onClick={() => addField('liveLinks')} type='button'>Add</button>
                {formData.liveLinks.map((element, index) => (
                    <div key={index} className='d-flex align-items-center'>
                    <input key={index} type="text" value={formData.liveLinks[index]} className="form-control" onChange={(e) => handleArrayChange('liveLinks', index, e)} />
                    <button className="btn btn-danger ms-2" type='button' name='liveLinks' onClick={(e)=>handleDelete(e,index)}>Delete</button>
                    </div>
                ))}
            </div>

            <div className="mb-3">
                <label htmlFor="titlePictureURL" className="form-label">Thumbnail Picture</label>
                <img src={formData.titlePictureURL} alt="None" width={150} />
                <input type="file" className="form-control" name='titlePictureURL' onChange={(e) => handleImage(e)} accept=".jpg, .jpeg, .png" multiple={false} />
            </div>

            <div className="mb-3">
                <label htmlFor="mp4URL" className="form-label">MP4 Video</label>
                <img src={formData.mp4URL} alt="None" width={150} />
                <input type="file" className="form-control" name='mp4URL' onChange={(e) => handleImage(e)} accept=".mp4" multiple={false} />
            </div>

            <div className="mb-3">
                <label className="form-label">Blog</label>
                <div>
                    <label htmlFor="blogImg"></label>
                    <input type="file" name='blogImg' onChange={(e) => addImageTOBlog(e)} accept=".jpg, .jpeg, .png" multiple={false} />

                    <div>
                        <div ref={quillRef}></div>
                    </div>
                </div>
            </div>


            <button type='submit' className='btn btn-primary' disabled={busy ? true : false}>Submit</button>
        </form>
    )
}

export default Form

import React, { useEffect, useRef, useState } from 'react'
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import addFileToStorage from '../firebase/addFile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getImageURL from '../firebase/getImage';

const Form = () => {
    const [formData, SetFormData] = useState(
        {
            id: 0,
            orderId: 0,
            type: {
                major: '',
                minor: ''
            },
            title: 'title',
            tagLine: 'blah',
            majorHashtags: [''],
            minorHashtags: [''],
            gitLinks: [''],
            liveLinks: [''],
            mainPara: '',
            titlePictureURL: '',
            mp4URL: '',
            blogFlow: '',
        }
    );
    const [busy, setBusy] = useState(false)

    // QUILL
    const modules = {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike',{'list': 'ordered'}, { 'list': 'bullet' },'link', 'blockquote', 'code-block',
          { 'header': 1 }, { 'header': 2 }],[{ 'script': 'sub'}, { 'script': 'super' }],
          [{ 'indent': '-1'}, { 'indent': '+1' }],
          [{ 'direction': 'rtl' }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'font': [] }],
          [{ 'align': [] }],
          ['clean']
        ],
      };
    
    const { quill, quillRef } = useQuill({modules});

    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                const html = quill.root.innerHTML;
                SetFormData(prevState => ({ ...prevState, blogFlow: html }));
            });
        }
    }, [quill]);

    function exportHTMLContents() {
        const html = quill.root.innerHTML;
        return html;
    }

    function insertExternalImage(url) {
        const index = quill.getSelection(true).index;
        quill.insertEmbed(index, 'image', url);
    }

    // DYNAMIC FORM
    const addField = (str) => {
        SetFormData({ ...formData, [str]: [...formData[str], ''] })
    }

    function handleArrayChange(str, index, e) {
        const newArray = formData[str];
        newArray[index] = e.target.value;
        SetFormData({ ...formData, [str]: newArray })
    }
    
    function handleChange(e) {
        SetFormData({ ...formData, [e.target.name]: `${e.target.value}` })
    }

    // SUBMIT FUNCTIONALITY
    function handleSubmit(e) {
        e.preventDefault()
        console.log(formData);
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

    async function addImageTOBlog(e){
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
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" name='title' onChange={(e) => handleChange(e)} />
            </div>

            <div className="mb-3">
                <label htmlFor="tagLine" className="form-label">Tag Line</label>
                <input type="text" className="form-control" name='tagLine' />
            </div>

            <div className="mb-3">
                <label htmlFor="mainPara" className="form-label">Main Para</label>
                <input type="text" className="form-control" name='mainPara' />
            </div>

            <div className="mb-3 border-0">
                <label>Major Hashtags</label>
                <button className="btn btn-primary ms-2" onClick={() => addField('majorHashtags')} type='button'>Add</button>
                {formData.majorHashtags.map((element, index) => (
                    <input key={index} type="text" className="form-control" onChange={(e) => handleArrayChange('majorHashtags', index, e)} />
                ))}
            </div>

            <div className="mb-3 border-0">
                <label>Minor Hashtags</label>
                <button className="btn btn-primary ms-2" onClick={() => addField('minorHashtags')} type='button'>Add</button>
                {formData.minorHashtags.map((element, index) => (
                    <input key={index} type="text" className="form-control" name={`minorHashtags${index}`} onChange={(e) => handleArrayChange('minorHashtags', index, e)} />
                ))}
            </div>

            <div className="mb-3 border-0">
                <label>Git Links</label>
                <button className="btn btn-primary ms-2" onClick={() => addField('gitLinks')} type='button'>Add</button>
                {formData.gitLinks.map((element, index) => (
                    <input key={index} type="text" className="form-control" onChange={(e) => handleArrayChange('gitLinks', index, e)} />
                ))}
            </div>

            <div className="mb-3 border-0">
                <label>Live Links</label>
                <button className="btn btn-primary ms-2" onClick={() => addField('liveLinks')} type='button'>Add</button>
                {formData.liveLinks.map((element, index) => (
                    <input key={index} type="text" className="form-control" onChange={(e) => handleArrayChange('liveLinks', index, e)} />
                ))}
            </div>

            <div className="mb-3">
                <label htmlFor="titlePictureURL" className="form-label">Thumbnail Picture</label>
                <input type="file" className="form-control" name='titlePictureURL' onChange={(e) => handleImage(e)} accept=".jpg, .jpeg, .png" multiple={false}/>
            </div>

            <div className="mb-3">
                <label htmlFor="mp4URL" className="form-label">MP4 Video</label>
                <input type="file" className="form-control" name='mp4URL' onChange={(e) => handleImage(e)} accept=".mp4" multiple={false}/>
            </div>

            <div className="mb-3">
                <label className="form-label">Blog</label>
                <div>
                    <label htmlFor="blogImg"></label>
                    <input type="file" name='blogImg' onChange={(e)=>addImageTOBlog(e)} accept=".jpg, .jpeg, .png" multiple={false}/>

                    {/* <div contentEditable className='border border-primary p-2 d-flex flex-column align-items-center' ref={blogRef}></div> */}
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

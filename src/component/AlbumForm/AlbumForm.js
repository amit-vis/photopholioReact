// import all the importent file and modules

import { addDoc, collection,} from "firebase/firestore";
import { db } from "../../firebaseInit";
import { useState } from "react";
import "./AlbumForm.css";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import folder from "../images/folder.png"

function AlbumForm({addData}){
    const [form, setForm] = useState('');

    // handle the submit
    async function handleSubmit(e){
        e.preventDefault();

        if (form.trim() === '') {
            alert('Please enter a folder name.');
            return; // Prevent further execution
          }

        const docRef = await addDoc(collection(db, "albums"),{
            name: form,
            ImageUrl: folder,
            createdOn: new Date()
        })
        addData({name: form, ImageUrl: folder})
        setForm('')
    }

    // handle the clear text using clear button
    function handleClear(event){
        event.preventDefault()
        setForm('')
    }

    // show the notification
    const notify = ()=>{
        if(form.trim()===""){
            return;
        }
        toast.success("Album Added Successfully")
    }
    return(
        <>
        <div className="formData">
        <form onSubmit={handleSubmit}>
            <Row label="Album Form">
                <input type="text" 
                className="input"
                value={form}
                onChange={(e)=>setForm(e.target.value)}
                placeholder="Enter the folder Name" />
            </Row>
            <button className="Add-btn" onClick={notify}>ADD</button>
            <button onClick={handleClear} className="clear-btn" >CLEAR</button>
        </form>
        </div>
        <ToastContainer/>
        </>
    )
}

export default AlbumForm;

function Row(props){
    const {label}= props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        </>
    )
}
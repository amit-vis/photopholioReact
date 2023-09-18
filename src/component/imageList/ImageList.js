// import all the importent file and modules

import { useEffect, useState } from "react"
import ImageForm from "../imageForm/ImageForm"
import { addDoc, collection, deleteDoc, onSnapshot, doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebaseInit";
import "./imageList.css"
import Corsel from "../corselFolder/corsel";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,toast } from "react-toastify";
import backBtn from "../images/back_btn.png";
import cross from "../images/cross_icon.png";
import search_icon from "../images/search_icon.png";
import update_icon from "../images/update_icon.png";
import delete_icon from "../images/delete_icon.png"

function ImageList({ albumName, setPage }) {
    const [images, setImages] = useState([]);
    const [showImageForm, setShowImageForm] = useState(false);
    const [updateImage, setUpdateImage] = useState(null);
    const [search, setSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResult, setSearchResult] = useState([images]);
    const [openModal, setOpenModel] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // function for Edit the image Name and image url
    const updateToImage = () => {
        setUpdateImage(null);
    }

    // ftch the data from the database
    useEffect(() => {
        const fetchImageData = async () => {
            const imageCollection = collection(db, "images")
            const snapShot = await onSnapshot(imageCollection, (querySnapShot) => {
                const imageData = querySnapShot.docs.map((image) => ({
                    id: image.id,
                    ...image.data()
                }))
                    .filter((image) => image.albumName === albumName); // Filter by albumName
                setImages(imageData);
            })
        }

        fetchImageData();
    }, [albumName])

    // storing the the data in database
    async function addImages(newImage) {
        setImages([...images, newImage])
        const docRef = await addDoc(collection(db, "images"), {
            url: newImage.url,
            imageName: newImage.imageName,
            albumName: albumName,
            createdON: new Date()
        })
    }

    // toggle the search button and icon
    const toggleSearchIcon = () => {
        setSearch(!search)
    }

    // toggle the image form container
    const toggleImageForm = () => {
        setShowImageForm(!showImageForm)
    }

    // Delete the Images from the data
    async function RemoveImage(id) {
        const docRef = doc(db, "images", id)
        await deleteDoc(docRef)
    }

    // stor the updated data in the db
    async function updateImagedata(newImageData) {
        const { id, imageName, url } = newImageData;
        const docRef = doc(db, "images", id);

        await updateDoc(docRef, {
            url: url,
            imageName: imageName,
        });

        // Update the images state to reflect the changes
        setImages((prevImages) =>
            prevImages.map((image) =>
                image.id === id ? { ...image, url: url, imageName: imageName } : image
            )
        );
    }

    // search the image
    useEffect(() => {
        const searchData = images.filter((data) =>
            data.imageName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResult(searchData);
    }, [searchQuery, images]);

    const modelOpen = (index)=>{
        setCurrentIndex(index)
        setOpenModel(true)
    }

    const notify = ()=>{
        toast.success("Image Deleted SuccessFully")
    }

    // function for toggle the image data
    const shouldRenderFuction = showImageForm || updateImage
    return (
        <>
            {shouldRenderFuction &&
                <ImageForm
                    addImages={addImages}
                    albumName={albumName}
                    updateImage={updateImage}
                    updateToImage={updateToImage}
                    updateImagedata={updateImagedata} />}


            <div className="showimageformcontainer">
                <div className="show-image-back">
                    <div className="image-form-back">
                        <img
                            src={backBtn}
                            alt="back-btn" height="50px" width="50px"
                            onClick={() => setPage('album')}
                            className="back-icon" />
                    </div>

                    {images.length > 0 && <h2 className="image-form-heading">{`Image in ${albumName}`}</h2>}
                </div>


                <div className="show-image-search">
                    {images.length > 0 &&
                        search &&
                        <input type="text"
                            className="search-input"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onInput={setSearchQuery} />}

                    {images.length > 0 &&
                        <img
                            src={search ? cross
                                : search_icon}
                            alt="search-btn" height="30px" width="30px"
                            onClick={toggleSearchIcon} className="cross" />}
                    <button className="toggle-image-form-btn" 
                    onClick={toggleImageForm}>
                        {shouldRenderFuction ? "Cancel" : "Add Image"}
                        </button>
                </div>
            </div>

            <ul className="imageList">
                {searchResult.map((image, id) => (
                    <li className="image-list-item" key={id}>
                        <div className="image-list-icons">
                            <button
                                className="update-btn"
                                onClick={() => setUpdateImage(image)}>
                                <img src={update_icon}
                                    alt="update-btn" width="20px" height="20px" />
                            </button>
                            <button className="delete-btn" onClick={() =>{notify();RemoveImage(image.id)}}>
                                <img src={delete_icon}
                                    alt="delete-btn" width="20px" height="20px" />
                            </button>
                        </div>
                        <img src={image.url} alt={`${image.imageName} ${id+1}`} width="100%" height="100%" onClick={()=>modelOpen(id)} />
                        <p className="">{image.imageName}</p>

                    </li>
                ))}

            </ul>
            <ToastContainer/>
            {searchResult.length === 0 && <p>No Images Found</p>}
            <Corsel 
            images={images} 
            openModal={openModal} 
            setOpenModel={setOpenModel} 
            currentIndex={currentIndex} 
            setCurrentIndex={setCurrentIndex}
            modelOpen={modelOpen} />
        </>
    )
}

export default ImageList
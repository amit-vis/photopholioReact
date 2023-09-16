// import all the importent file and modules
import { useEffect, useState } from "react";
import "./imageForm.css";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function ImageForm({ addImages, albumName, updateImage, updateToImage, updateImagedata }) {
  const [imageForm, setImageForm] = useState({ fileName: "", imageUrl: "" });

  // restore the user url and name for the update
  useEffect(() => {
    if (updateImage) {
      // Update the imageForm state with the values from updateImage
      setImageForm({
        fileName: updateImage.imageName,
        imageUrl: updateImage.url,
      });
    }
  }, [updateImage]);

  // handle the submit function
  async function handleImageSubmit(e) {
    e.preventDefault();
    if (updateImage) {
      // Call the updateImagedata function and pass a callback to update the state after Firebase update
      await updateImagedata({
        id: updateImage.id,
        imageName: imageForm.fileName,
        url: imageForm.imageUrl,
      });
      updateToImage();
    } else {
      addImages({
        imageName: imageForm.fileName,
        url: imageForm.imageUrl,
      });
    }
    setImageForm({ fileName: "", imageUrl: "" }); // Clear the form fields
  }

  // handle the clear data after click the clear button
  const handleClearBtn = (e)=>{
    e.preventDefault()
    setImageForm({fileName: "", imageUrl: ""})
  }

  // handle the notification
  const notify = ()=>{
    if(updateImage){
    toast.success("Image updated SuccessFully!")
  }else{
    toast.success("Images Added SuccessFully!")
  }
}

  return (
    <>
      <div className="imageForm">
        <h2>{albumName ? `Add Image To ${albumName}` : "Not Found"}</h2>
        <form onSubmit={handleImageSubmit}>
          <div>
            <input
              type="text"
              className="form-input"
              value={imageForm.fileName}
              onChange={(e) =>
                setImageForm({ ...imageForm, fileName: e.target.value })
              }
              placeholder="Image Name"
            />
          </div>
          <div>
            <input
              type="text"
              className="form-input"
              value={imageForm.imageUrl}
              onChange={(e) =>
                setImageForm({ ...imageForm, imageUrl: e.target.value })
              }
              placeholder="Url"
            />
          </div>
          <div className="image-btn">
            <button className="Add-btn" onClick={notify}>
              {updateImage ? "Update" : "Add"}
            </button>
            <button className="clear-btn" onClick={handleClearBtn}>Clear</button>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </>
  );
}

export default ImageForm;

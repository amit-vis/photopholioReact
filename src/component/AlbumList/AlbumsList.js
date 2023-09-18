// import all the importent file and modules

import { useState } from "react";
import ImageList from "../imageList/ImageList";
import AlbumForm from "../AlbumForm/AlbumForm";
import "./AlbumList.css";

function AlbumsList({ data, addData }) {
  const [showForm, setShowForm] = useState(false)
  const [selectedAlbumName, setSelectedAlbumName] = useState("");
  const [page, setPage] = useState("album");

  // handle the toggle of of the image
  const handlePageButton = (albumName) => {
    setSelectedAlbumName(albumName);
    setPage("image");
  };

  // handle toggle the album form
  const toggleForm = ()=>{
    setShowForm(!showForm);
  }

  return (
    <>
    {page==="album" &&(
        <div>
          {showForm && <AlbumForm addData={addData}/>}
    <div className='AlbumFormContainer'>
        <h3>Albums List</h3>
      <button className='toggleButton' onClick={toggleForm}>{showForm?"Cancel": "Create Button"}</button>
      </div>
          <ul className="albumlist">
            {data.map((item) => (
              <li
                key={item.id}
                className="album-list-item"
                onClick={() => handlePageButton(item.name)}
              >
                <img
                  src={item.ImageUrl}
                  alt="folder-icon"
                  width="100px"
                  className="item-image"
                />
                <p>{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
        )}
      {page === "image" && <ImageList albumName={selectedAlbumName} setPage={setPage} />}
    </>
  );
}

export default AlbumsList;

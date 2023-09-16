// import all the importent file and modules
import { useState,useEffect } from 'react';
import './App.css';
import Navbar from './component/Navbar';
import AlbumsList from './component/AlbumList/AlbumsList';
import { db } from './firebaseInit';
import { collection, onSnapshot } from 'firebase/firestore';

function App() {
  const [currentPage, setCurrentPage] = useState("main")
  const [data, setData] = useState([]);

  // useEffect to fetch the album data
  useEffect(() => {
    // Fetch the initial data when the component mounts
    const fetchData = async () => {
      const albumCollection = collection(db, "albums");
      const snapShot = await onSnapshot(albumCollection, (querySnapshot) => {
        const albumData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(albumData);
      });
    };

    fetchData();
  }, []);

  // handle addData function
  const addData = async (newData)=>{

    setData((prevData)=>[...prevData,newData])
    
  }
  return (
    <div className="App">
       <Navbar setCurrentPage={setCurrentPage} />
       {currentPage==="main"&&<AlbumsList data={data} addData={addData}/>}
    </div>
  );
}

export default App;

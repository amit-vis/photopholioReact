// import all the importent file and modules

import "./corsel.css";
import close from "../images/close_icon.png";
import back from "../images/back.png";
import next from "../images/next.png";


function Corsel({ openModal,setOpenModel,currentIndex,setCurrentIndex, images }) {

  // handle the close the carousel
  const closeModal = () => {
    setOpenModel(false);
  };

  // handle the next and prev image
  const changeImage = (direction) => {
    let newIndex = currentIndex + direction;

    if (newIndex < 0) {
      newIndex = images.length - 1;
    } else if (newIndex >= images.length) {
      newIndex = 0;
    }

    setCurrentIndex(newIndex);
  };

  return (
    <>

      {openModal && (
        <div className="modal">
          <span className="close" onClick={closeModal}>
            <img src={close} alt="close" height="50px" width="50px" />
          </span>
          <div className="carousel">
            <button className="prev" onClick={() => changeImage(-1)}>
              <img src={back} alt="prev" height="30px" width="30px" />
            </button>
            <img
            src={images[currentIndex].url}
            alt={`${images[currentIndex].imageName} ${currentIndex + 1}`}
            className="modal-img"
          />
            <button className="next" onClick={() => changeImage(1)}>
              <img src={next} alt="next" height="30px" width="30px" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Corsel;

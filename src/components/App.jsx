import { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import Button from "./Button/Button";
import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";
import Searchbar from "./Searchbar/Searchbar";
import { api } from "./services/api";


const App = () => {

  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showLoader, setShowLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [images, setImages] = useState([]);


  useEffect(()=>{
    
    const fetchImages = async () => {
      const response = await api(query, page);
      const filtredResponse = response.map(
        ({ id, webformatURL, largeImageURL }) => {
          return { id, webformatURL, largeImageURL };
        }
      );
      setImages(state => [...state, ...filtredResponse]);
      setShowLoader(false);
    }

    if (query !== '' || page !== 1) {
      setShowLoader(true);
      fetchImages();
    }
    
  },[query, page])

  const handleFormSubmit = (value) => { 
    if (query !== value && value !== '') {
      setQuery(value);
      setPage(1);
      setImages([]);
    }
  }

  const handleLMBtnClick = () => {
    setPage(state => state + 1);
  }

  const openModal = (event) => {
    const { alt } = event.target;
    if (alt) {
      setShowModal(true);
      setModalImg(alt);
    }
  }

  const onCloseModal = () => {
    setShowModal(false);
    setModalImg('');
  }

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      {images.length > 0 && (
        <ImageGallery items={images} onClick={openModal} />
      )}
      {showLoader ? (
        <Grid
          height="120"
          width="80"
          color="#3f51b5"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{ justifyContent: 'center' }}
          wrapperClass=""
          visible={true}
        />
      ) : (
        images.length > 0 && (
          <Button onClick={handleLMBtnClick} />
        )
      )}
      {showModal && (
        <Modal img={modalImg} onCloseModal={onCloseModal} />
      )}
    </>
  )
};

export default App



 

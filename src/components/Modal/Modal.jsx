import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';


const Modal = ({img, onCloseModal}) => {

  useEffect(() =>{
    window.addEventListener('keydown', closeModal);
    return () => {
      window.removeEventListener('keydown', closeModal);
    }
  },[])
  
  const closeModal = (event) => {
    if (event.code === 'Escape' || event.target === event.currentTarget) {
      onCloseModal();
    }
  }

  return createPortal(
    <div className="Overlay" onClick={closeModal}>
      <div className="Modal">
        <img src={img} alt="/" />
      </div>
    </div>,
    document.getElementById('modal')
  );
};

Modal.propTypes = {
  img: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal
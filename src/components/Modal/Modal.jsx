import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import { Component } from "react";

class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }

  closeModal = (event) => {
    if (event.code === 'Escape' || event.target === event.currentTarget) {
      this.props.onCloseModal();
    }
  }

  render(){
    return createPortal(
      <div className="Overlay" onClick={this.closeModal}>
        <div className="Modal">
          <img src={this.props.img} alt="/" />
        </div>
      </div>,
      document.getElementById('modal')
    );
  }
  
};

Modal.propTypes = {
  img: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal
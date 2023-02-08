import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, largeImageURL, onClick }) => {
  return (
    <li className="ImageGalleryItem-item">
      <img
        src={webformatURL}
        alt={largeImageURL}
        onClick={onClick}
        className="ImageGalleryItem-image"
      />
    </li>
  );
};


ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ImageGalleryItem;

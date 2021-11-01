import React from 'react';

/**
 * @property {Object} props
 * @property {Style} props.style
 */
const ImageGallery = ({ style }) => (
  <figure>
    <img src={style.photos[0].url}/>
  </figure>
);

export default ImageGallery;

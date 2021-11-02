import React from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterIcon,
  TwitterShareButton,

} from 'react-share';

/**
 * @param {Object} props
 * @param {Product} props.product
 */
const Blurb = ({ product }) => {
  const url = `https://www.project-catwalk.com/${product.id}`;
  return (
    <div>
      <h3>{product.slogan}</h3>
      <p>{product.description}</p>
      Share on:
      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round/>
      </FacebookShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon size={32} round/>
      </TwitterShareButton>
      <PinterestShareButton url={url}>
        <PinterestIcon size={32} round/>
      </PinterestShareButton>
    </div>
  );
};

export default Blurb;

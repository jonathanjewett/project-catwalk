import React from 'react';
import AddToCart from './AddToCart';
import ImageGallery from './ImageGallery';
import ProductInformation from './ProductInformation';
import StyleSelector from './StyleSelector';
import './overview.scss';

import sampleData from './sampleData';

const Overview = () => {
  let { rating } = sampleData;
  return (
    <div id="overview">
      <ProductInformation rating={rating}/>
      <StyleSelector/>
      <AddToCart/>
      <ImageGallery/>
    </div>
  );
};

export default Overview;

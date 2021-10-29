import React from 'react';
import AddToCart from './AddToCart';
import ImageGallery from './ImageGallery';
import ProductInformation from './ProductInformation';
import StyleSelector from './StyleSelector';
import './overview.scss';

const Overview = () => (
  <div id="overview">
    <ProductInformation/>
    <StyleSelector/>
    <AddToCart/>
    <ImageGallery/>
  </div>
);

export default Overview;

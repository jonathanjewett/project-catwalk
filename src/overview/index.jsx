import React from 'react';
import AddToCart from './AddToCart';
import ImageGallery from './ImageGallery';
import ProductInformation from './ProductInformation';
import StyleSelector from './StyleSelector';
import './overview.scss';

import sampleData from './sampleData';

const Overview = () => {
  // these will eventually come from React props when the API is plugged in
  let { product, rating, styles } = sampleData;
  const [styleIndex, setStyleIndex] = React.useState(0);
  // reset to the first style when a new product is displayed
  React.useEffect(() => setStyleIndex(0), [product.id]);
  const style = styles[styleIndex];

  return (
    <div id="overview">
      <ProductInformation product={product} rating={rating} style={style}/>
      <StyleSelector/>
      <AddToCart/>
      <ImageGallery/>
    </div>
  );
};

export default Overview;

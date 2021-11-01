import React from 'react';
import AddToCart from './AddToCart';
import ImageGallery from './ImageGallery';
import ProductInformation from './ProductInformation';
import StyleSelector from './StyleSelector';
import './overview.scss';

// these will eventually come from React props when the API is plugged in
import { product, rating, styles } from './sampleData';

const Overview = (/* { product, rating, styles } */) => {
  const [styleIndex, setStyleIndex] = React.useState(0);
  // reset to the first style when a new product is displayed
  React.useEffect(() => setStyleIndex(0), [product.id]);
  const style = styles[styleIndex];

  return (
    <div id="overview">
      <ProductInformation product={product} rating={rating} style={style}/>
      <StyleSelector styles={styles} style={style} setStyle={setStyleIndex}/>
      <AddToCart/>
      <ImageGallery/>
    </div>
  );
};

export default Overview;

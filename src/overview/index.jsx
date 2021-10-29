import React from 'react';
import AddToCart from './AddToCart';
import ImageGallery from './ImageGallery';
import ProductInformation from './ProductInformation';
import StyleSelector from './StyleSelector';
import './overview.scss';

import sampleData from './sampleData';

const Overview = () => {
  let { product, rating, styles } = sampleData;
  const [page, setPage] = React.useState(0);
  React.useEffect(() => setPage(0), [product.id]);
  const style = styles[page];

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

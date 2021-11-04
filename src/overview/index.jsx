import React from 'react';
import AddToCart from './AddToCart';
import Blurb from './Blurb';
import ImageGallery from './ImageGallery';
import ProductInformation from './ProductInformation';
import StyleSelector from './StyleSelector';
import './overview.scss';

// these will eventually come from React props when the API is plugged in
import { product, rating, styles } from './sampleData';

const Overview = (/* { product, rating, styles } */) => {
  const [styleIndex, setStyleIndex] = React.useState(0);
  // zoomed in amount:
  // 0: standard view
  // 1: expanded view
  // 2: zoomed-in view
  const [zoom, setZoom] = React.useState(0);
  // reset state when a new product is displayed
  React.useEffect(() => {
    setStyleIndex(0);
    setZoom(0);
  }, [product.id]);
  const style = styles[styleIndex];

  return (
    <div id="overview">
      <div>
        <ImageGallery style={style} zoom={zoom} setZoom={setZoom}/>
        <div className="info" style={{display: zoom === 0 ? null : 'none'}}>
          <ProductInformation product={product} rating={rating} style={style}/>
          <StyleSelector
            styles={styles}
            style={style}
            setStyleIndex={setStyleIndex}
          />
          <AddToCart style={style}/>
        </div>
      </div>
      <Blurb product={product}/>
    </div>
  );
};

export default Overview;

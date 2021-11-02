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
  // whether or not the image gallery expands over the product info
  const [expand, setExpand] = React.useState(false);
  // reset state when a new product is displayed
  React.useEffect(() => {
    setStyleIndex(0);
    setExpand(false);
  }, [product.id]);
  const style = styles[styleIndex];

  return (
    <div id="overview">
      <div>
        <ImageGallery style={style} expand={expand} setExpand={setExpand}/>
        <div className="info" style={{display: expand ? 'none' : null}}>
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

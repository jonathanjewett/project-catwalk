import React from 'react';
import CardItem from './CardItem.jsx';

const RelatedItemsList = (props) => {
  return (
    <div className="related-container">
      <button type="button" className="left-arrow"> &lt; </button>
      <div className="related-items-list">
        {props.products.map((product) => <CardItem key={product.id} product={product} />)}
      </div>
      <button type="button" className="right-arrow"> &gt; </button>
    </div>
  );
};

export default RelatedItemsList;
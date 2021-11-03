import React from 'react';
import CardItem from './CardItem.jsx';

const RelatedItemsList = (props) => {
  return (
    <div className="related-items-list">
      <button type="button" className="left-arrow"> &lt; </button>
      {props.products.map((product) => <CardItem key={product.id} product={product} />)}
      <button type="button" className="right-arrow"> &gt; </button>
    </div>
  );
};

export default RelatedItemsList;
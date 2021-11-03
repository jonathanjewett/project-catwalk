import React from 'react';
import CardItem from './CardItem.jsx';

const RelatedItemsList = (props) => {
  return (
    <div className="related-items-list">
      {props.products.map((product) => <CardItem key={product.id} product={product} />)}
    </div>
  );
};

export default RelatedItemsList;
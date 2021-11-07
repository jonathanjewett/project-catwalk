import React, { useEffect, useState } from 'react';
import CardItem from './CardItem.jsx';

const RelatedItemsList = (props) => {
  const products = props.products;
  const [currList, setCurrList] = useState(products);
  const [currIndex, setCurrIndex] = useState(0);

  // "useEffect is componentDidMount, componentDidUpdate, and componentWillUnmount combined"

  const next = () => {
    setCurrIndex(currIndex + 1); // this is changing what currIndex will be the next time the component renders
    setCurrList(products.slice(currIndex + 1));
  };

  const prev = () => {
    setCurrIndex(currIndex - 1);
    setCurrList(products.slice(currIndex - 1));
  };

  const rightButton = currIndex === products.length - 1 ? null :
    <button type="button" className="right-arrow" onClick={next}> &gt; </button>;

  const leftButton = currIndex === 0 ? null :
    <button type="button" className="left-arrow" onClick={prev}> &lt; </button>;


  return (
    <div>
      <h3>RELATED PRODUCTS</h3>
      <div className="list-container">
        <div className="scroll-button-container">
          {leftButton}
        </div>
        <div className="related-items-list">
          {currList.map(({ product, metadata, styles }) =>
            <CardItem key={product.id} product={product} rating={metadata.rating} styles={styles}/>
          )}
        </div>
        {rightButton}
      </div>
    </div>
  );
};

export default RelatedItemsList;

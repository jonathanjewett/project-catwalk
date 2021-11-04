import React, {useEffect, useState} from 'react';
import CardItem from './CardItem.jsx';

const RelatedItemsList = (props) => {
  const allProducts = props.products;
  const products = props.products;
  const [currList, setCurrList] = useState(products);
  const [currIndex, setCurrIndex] = useState(0);
  const [length, setLength] = useState(products.length);

  // set length to current products
  // "useEffect is componentDidMount, componentDidUpdate, and componentWillUnmount combined"
  useEffect(() => {

  });

  const next = () => {
    setCurrIndex(currIndex + 1);
    setCurrList(products.slice(currIndex + 1)); //bandaid fix, still not sure why its not updating the array without the +1 here
  };


  return (
    <div>
      <h3>RELATED PRODUCTS</h3>
      <div className="related-container">
        <button type="button" className="left-arrow"> &lt; </button>
        <div className="related-items-list">
          {currList.map((product) => <CardItem key={product.id} product={product} />)}
        </div>
        <button type="button" className="right-arrow" onClick={next}> &gt; </button>
      </div>
    </div>
  );
};

export default RelatedItemsList;
import React from 'react';
import RelatedItemsList from './RelatedItemsList.jsx';
import OutfitList from './OutfitList.jsx';
import './related-items-and-comparisons.scss';

const RelatedItemsAndComparisons = (props) => (
  <div id="related-items-and-comparisons">
    <div>
      <RelatedItemsList products={props.products} currentProduct={props.info}/>
      <OutfitList currentProduct={props.info}/>
    </div>
  </div>
);

export default RelatedItemsAndComparisons;

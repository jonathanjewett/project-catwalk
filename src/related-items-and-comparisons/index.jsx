import React from 'react';
import CardItem from './CardItem.jsx';
import RelatedItemsList from './RelatedItemsList.jsx';
import ComparisonModal from './ComparisonModal.jsx';
import OutfitList from './OutfitList.jsx';
import './related-items-and-comparisons.scss';

import { products } from './sampleData.js';

const RelatedItemsAndComparisons = (props) => (
  <div id="related-items-and-comparisons">
    <div>
      <RelatedItemsList products={products} currentProduct={props.info}/>
      <OutfitList products={products} currentProduct={props.info}/>
    </div>
  </div>
);

export default RelatedItemsAndComparisons;

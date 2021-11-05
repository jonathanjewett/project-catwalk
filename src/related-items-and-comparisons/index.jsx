import React from 'react';
import CardItem from './CardItem.jsx';
import RelatedItemsList from './RelatedItemsList.jsx';
import ComparisonModal from './ComparisonModal.jsx';
import './related-items-and-comparisons.scss';

import { products, stylesForProducts, relatedProducts } from './sampleData.js';

const RelatedItemsAndComparisons = (props) => (
  <div id="related-items-and-comparisons">
    <div>
      <RelatedItemsList products={products}/>
      <ComparisonModal/>
    </div>
  </div>
);

export default RelatedItemsAndComparisons;

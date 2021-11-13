import React from 'react';
import { ScrollView } from '../common';
import CardItem from './CardItem.jsx';
import OutfitList from './OutfitList.jsx';
import './related-items-and-comparisons.scss';

const RelatedItemsAndComparisons = (props) => (
  <div id="related-items-and-comparisons">
    {props.products.length > 0 ? <h3>Related Products</h3> : null}
    <ScrollView>
      {props.products.map(({ product, metadata, styles }) =>
        <CardItem
          key={product.id}
          product={product}
          rating={metadata.rating}
          styles={styles}
          currentProduct={props.info}
        />
      )}
    </ScrollView>
    <h3>Your Outfit</h3>
    <OutfitList currentProduct={props.info}/>
  </div>
);

export default RelatedItemsAndComparisons;

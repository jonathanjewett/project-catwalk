import React, { useState } from 'react';
import OutfitCard from './OutfitCard.jsx';
import { ScrollView } from '../common';

const OutfitList = (props) => {
  const [outfit, updateOutfit] = useState(() =>
    !import.meta.env.SSR && JSON.parse(localStorage.getItem('outfit')) || []
  );
  const addToOutfit = () => {
    if (outfit.some(item => item.product.id === props.currentProduct.product.id)) {
      return;
    }
    const newOutfit = [...outfit, props.currentProduct];
    if (!import.meta.env.SSR) {
      localStorage.setItem('outfit', JSON.stringify(newOutfit));
    }
    updateOutfit(newOutfit);
  };

  const removeFromOutfit = (product) => {
    const newOutfit = outfit.filter(item => item.product.id !== product.id);
    if (!import.meta.env.SSR) {
      localStorage.setItem('outfit', JSON.stringify(newOutfit));
    }
    updateOutfit(newOutfit);
  };

  return (
    <ScrollView>
      <div className="add-card" onClick={addToOutfit}>
        <div className="add-button">+</div>
        <div className="add-text">Add to Outfit</div>
      </div>
      {outfit.map(({ product, metadata, styles }) =>
        <OutfitCard
          key={product.id}
          product={product}
          rating={metadata.rating}
          styles={styles}
          remove={removeFromOutfit}
        />
      )}
    </ScrollView>
  );
};

export default OutfitList;

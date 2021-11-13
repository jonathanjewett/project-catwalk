import React, { useState } from 'react';
import OutfitCard from './OutfitCard.jsx';
import { ScrollView } from '../common';

const OutfitList = (props) => {
  const [outfit, updateOutfit] = useState(() => !import.meta.env.SSR && JSON.parse(localStorage.getItem('outfit')) || []);
  const [outfitIDs, updateOutfitIDs] = useState(() => !import.meta.env.SSR && JSON.parse(localStorage.getItem('outfitIDs')) || []);
  const addToOutfit = () => {
    if (outfitIDs.includes(props.currentProduct.product.id)) {
      return;
    }
    const newOutfit = [...outfit, props.currentProduct];
    const newOutfitIDs = [...outfitIDs, props.currentProduct.product.id];
    if (!import.meta.env.SSR) {
      localStorage.setItem('outfit', JSON.stringify(newOutfit));
      localStorage.setItem('outfitIDs', JSON.stringify(newOutfitIDs));
    }
    updateOutfit(newOutfit);
    updateOutfitIDs(newOutfitIDs);
  };

  const removeFromOutfit = (product) => {
    // Could have sliced first, then spliced new array
    var newOutfitRemoved = [];
    var newOutfitIDsRemoved = [];
    for (var i = 0; i < outfit.length; i++) {
      if (outfit[i].product.id !== product.id) {
        newOutfitRemoved.push(outfit[i]);
        newOutfitIDsRemoved.push(outfit[i].product.id);
      }
    }
    if (!import.meta.env.SSR) {
      localStorage.setItem('outfit', JSON.stringify(newOutfitRemoved));
      localStorage.setItem('outfitIDs', JSON.stringify(newOutfitIDsRemoved));
    }
    updateOutfit(newOutfitRemoved);
    updateOutfitIDs(newOutfitIDsRemoved);
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

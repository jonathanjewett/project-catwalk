import React, { useState } from 'react';
import OutfitCard from './OutfitCard.jsx';

const OutfitList = (props) => {
  const [outfit, updateOutfit] = useState(() => JSON.parse(localStorage.getItem('outfit')) || []);
  const [outfitIDs, updateOutfitIDs] = useState(() => JSON.parse(localStorage.getItem('outfitIDs')) || []);
  const [currIndex, setCurrIndex] = useState(0);

  const next = () => {
    setCurrIndex(currIndex + 1); // this is changing what currIndex will be the next time the component renders
  };

  const prev = () => {
    setCurrIndex(currIndex - 1);
  };

  const addToOutfit = () => {
    if (!outfitIDs.includes(props.currentProduct.product.id)) {
      const newOutfit = [...outfit, props.currentProduct];
      localStorage.setItem('outfit', JSON.stringify(newOutfit));
      updateOutfit(newOutfit);
      const newOutfitIDs = [...outfitIDs, props.currentProduct.product.id];
      localStorage.setItem('outfitIDs', JSON.stringify(newOutfitIDs));
      updateOutfitIDs(newOutfitIDs);
    }
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
    localStorage.setItem('outfit', JSON.stringify(newOutfitRemoved));
    updateOutfit(newOutfitRemoved);
    localStorage.setItem('outfitIDs', JSON.stringify(newOutfitIDsRemoved));
    updateOutfitIDs(newOutfitIDsRemoved);
  };


  const rightButton = currIndex === outfit.length - 1 || outfit.length === 0 ? null :
    <button type="button" className="right-arrow" onClick={next}> &gt; </button>;

  const leftButton = currIndex === 0 ? null :
    <button type="button" className="left-arrow" onClick={prev}> &lt; </button>;

  return (
    <div>
      <h3>YOUR OUTFIT</h3>
      <div className="list-container">
        <div className="scroll-button-container">
          {leftButton}
        </div>
        <div className="card-list">
          <div className="add-card" onClick={addToOutfit}>
            <div className="add-button">+</div>
            <div className="add-text">Add to Outfit</div>
          </div>
          {outfit.slice(currIndex).map(({ product, metadata, styles }) =>
            <OutfitCard key={product.id} product={product} rating={metadata.rating} styles={styles} remove={removeFromOutfit} />
          )}
        </div>
        {rightButton}
      </div>
    </div>
  );
};

export default OutfitList;
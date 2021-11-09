import React, { useEffect, useState } from 'react';
import OutfitCard from './OutfitCard.jsx';

const OutfitList = (props) => {
  // hook for array of outfits, starts with nothing by default
  // items must be unique, so clicking does nothing if product is already in the list
  // should always have an "add to list" card
  const [outfit, updateOutfit] = useState([]);
  const [currList, setCurrList] = useState(outfit);
  const [currIndex, setCurrIndex] = useState(0);

  const next = () => {
    setCurrIndex(currIndex + 1); // this is changing what currIndex will be the next time the component renders
    setCurrList(outfit.slice(currIndex + 1));
  };

  const prev = () => {
    setCurrIndex(currIndex - 1);
    setCurrList(outfit.slice(currIndex - 1));
  };

  const addToOutfit = () => { // need to replace with outfit from the current page
    if (!outfit.includes(props.products[0])) {
      // updateOutfit([...outfit, props.products[0].product]);
      updateOutfit([...outfit, props.products[0]]);
    }
  };

  const removeFromOutfit = (product) => {
    var index = -1;
    for (var i = 0; i < outfit.length; i++) {
      if (outfit[i].product.id === product.id) {
        index = i;
      }
    }
    if (index > -1) {
      updateOutfit(prevState => outfit.splice(index, 1));
    }
  };


  const rightButton = (currIndex === outfit.length - 1 || outfit.length === 0) ? null :
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
          {outfit.map(({ product, metadata, styles }) =>
            <OutfitCard key={product.id} product={product} rating={metadata.rating} styles={styles} remove={removeFromOutfit} />
          )}
        </div>
        {rightButton}
      </div>
    </div>
  );
};

export default OutfitList;
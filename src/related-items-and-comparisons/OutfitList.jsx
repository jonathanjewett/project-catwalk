import React, { useState } from 'react';
import OutfitCard from './OutfitCard.jsx';

const OutfitList = (props) => {
  // hook for array of outfits, starts with nothing by default
  // items must be unique, so clicking does nothing if product is already in the list
  // should always have an "add to list" card
  // var storedFits = JSON.parse(localStorage.getItem('outfit')) || [];
  // var storedIDs = JSON.parse(localStorage.getItem('outfitIDs')) || [];
  const [outfit, updateOutfit] = useState(() => JSON.parse(localStorage.getItem('outfit')) || []);
  const [outfitIDs, updateOutfitIDs] = useState(() => JSON.parse(localStorage.getItem('outfitIDs')) || []);
  // const [outfitIDs, updateOutfitIDs] = useState(storedIDs);
  // const [outfit, updateOutfit] = useState(storedFits);
  // var outfitIDs = storedIDs;
  // var outfit = storedFits;
  const [currIndex, setCurrIndex] = useState(0);

  // using this for a homemade forceUpdate
  // const [val, setVal] = useState(0);


  const next = () => {
    setCurrIndex(currIndex + 1); // this is changing what currIndex will be the next time the component renders
  };

  const prev = () => {
    setCurrIndex(currIndex - 1);
  };

  const addToOutfit = () => {
    if (!outfitIDs.includes(props.currentProduct.product.id)) {
      // updateOutfit([...outfit, props.currentProduct]);
      // updateOutfitIDs([...outfitIDs, props.currentProduct.product.id]);
      // outfit.push(props.currentProduct);
      // outfitIDs.push(props.currentProduct.product.id);
      // setVal(val => val + 1);
      const newOutfit = [...outfit, props.currentProduct];
      localStorage.setItem('outfit', JSON.stringify(newOutfit));
      updateOutfit(newOutfit);
      const newOutfitIDs = [...outfitIDs, props.currentProduct.product.id];
      localStorage.setItem('outfitIDs', JSON.stringify(newOutfitIDs));
      updateOutfitIDs(newOutfitIDs);
    }
    // localStorage.setItem('outfit', JSON.stringify(outfit));
    // localStorage.setItem('outfitIDs', JSON.stringify(outfitIDs));
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

    /*
    var index = -1;
    for (var i = 0; i < outfit.length; i++) {
      if (outfit[i].product.id === product.id) {
        index = i;
      }
    }
    if (index > -1) {
      console.log(index);
      var newOutfitRemove = outfit.splice(index, 1);
      console.log(newOutfitRemove);
      localStorage.setItem('outfit', JSON.stringify(newOutfitRemove));
      updateOutfit(newOutfitRemove);
      const newOutfitIDs = outfitIDs.splice(index, 1);
      localStorage.setItem('outfitIDs', JSON.stringify(newOutfitIDs));
      updateOutfitIDs(newOutfitIDs);
      // updateOutfit(prevState => outfit.splice(index, 1));
      // updateOutfitIDs(prevState => outfitIDs.splice(index, 1));
      // outfit.splice(index, 1);
      // outfitIDs.splice(index, 1);
      // setVal(val => val + 1);
    }
    // localStorage.setItem('outfit', JSON.stringify(outfit));
    // localStorage.setItem('outfitIDs', JSON.stringify(outfitIDs));
    */
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
import React, { useState } from 'react';
import OutfitCard from './OutfitCard.jsx';

const toggleButtons = (setHideLeft, setHideRight, list, offset) => {
  if (list.children[0]) {
    const children = list.children;
    const listRect = list.getBoundingClientRect();
    // console.log(listRect.right);
    const cardRect = children[children.length - 1].getBoundingClientRect();
    setHideLeft(list.scrollLeft + offset <= 0);
    setHideRight(listRect.right + offset >= cardRect.right);
    // console.log(list.scrollLeft + offset);
  }
};

const emptyList = (setHideLeft, setHideRight) => {
  setHideLeft(true);
  setHideRight(true);
};

/** @param {HTMLElement} list */
const calculateCardWidth = (list) => {
  if (list.children[0]) {
    const firstCard = list.children[0];
    const border = firstCard.offsetLeft - list.offsetLeft;
    return firstCard.offsetWidth + border * 2;
  }
};

const OutfitList = (props) => {
  const [outfit, updateOutfit] = useState(() => JSON.parse(localStorage.getItem('outfit')) || []);
  const [outfitIDs, updateOutfitIDs] = useState(() => JSON.parse(localStorage.getItem('outfitIDs')) || []);

  const [hideLeft, setHideLeft] = useState(true);
  const [hideRight, setHideRight] = useState(true);
  const [cardWidth, setCardWidth] = useState(0);
  const listRef = React.createRef();

  React.useEffect(() => {
    const list = listRef.current;
    const resizeListener = () => {
      setCardWidth(calculateCardWidth(list));
      toggleButtons(setHideLeft, setHideRight, list, 0);
    };
    resizeListener();
    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }, []);

  const moveList = (direction) => {
    const list = listRef.current;
    const scrollBy = direction === 'right' ? cardWidth : -cardWidth;
    list.scrollTo({
      top: 0,
      left: list.scrollLeft + scrollBy,
      behavior: 'smooth'
    });
    toggleButtons(setHideLeft, setHideRight, list, scrollBy);
  };
  const prev = () => moveList('left');
  const next = () => moveList('right');

  const addToOutfit = () => {
    if (!outfitIDs.includes(props.currentProduct.product.id)) {
      const newOutfit = [...outfit, props.currentProduct];
      localStorage.setItem('outfit', JSON.stringify(newOutfit));
      updateOutfit(newOutfit);
      const newOutfitIDs = [...outfitIDs, props.currentProduct.product.id];
      localStorage.setItem('outfitIDs', JSON.stringify(newOutfitIDs));
      updateOutfitIDs(newOutfitIDs);
    }
    // added to try and toggle buttons correctly when adding item
    toggleButtons(setHideLeft, setHideRight, listRef.current, -cardWidth);
  };

  const removeFromOutfit = (product) => {
    // Could have sliced first, then spliced new array
    var newOutfitRemoved = [];
    var newOutfitIDsRemoved = [];
    for (var i = 0; i < outfit.length; i++) {
      if (outfit[i].product.id !== product.id) {
        newOutfitRemoved.push(outfit[i]);
        newOutfitIDsRemoved.push(outfit[i].product.id);
        // added to try and toggle buttons correctly when removing item
        toggleButtons(setHideLeft, setHideRight, listRef.current, cardWidth);
      }
    }
    localStorage.setItem('outfit', JSON.stringify(newOutfitRemoved));
    updateOutfit(newOutfitRemoved);
    localStorage.setItem('outfitIDs', JSON.stringify(newOutfitIDsRemoved));
    updateOutfitIDs(newOutfitIDsRemoved);

  };

  const rightButton = hideRight || outfit.length === 0 ? null :
    <button type="button" className="right-arrow" onClick={next}> &gt; </button>;

  const leftButton = hideLeft || outfit.length === 0 ? null :
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
          <div className="card-list" ref={listRef}>
            {outfit.map(({ product, metadata, styles }) =>
              <OutfitCard key={product.id} product={product} rating={metadata.rating} styles={styles} remove={removeFromOutfit} />
            )}
          </div>
        </div>
        {rightButton}
      </div>
    </div>
  );
};

export default OutfitList;
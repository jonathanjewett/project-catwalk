import React, { useState } from 'react';
import CardItem from './CardItem.jsx';

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

/** @param {HTMLElement} list */
const calculateCardWidth = (list) => {
  if (list.children[0]) {
    const firstCard = list.children[0];
    const border = firstCard.offsetLeft - list.offsetLeft;
    return firstCard.offsetWidth + border * 2;
  }
};

const RelatedItemsList = (props) => {
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

  React.useEffect(() => {
    toggleButtons(setHideLeft, setHideRight, listRef.current, 0);
  }, [props.products.length]);

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

  const rightButton = hideRight ? null :
    <button type="button" className="right-arrow" onClick={next}> &gt; </button>;

  const leftButton = hideLeft ? null :
    <button type="button" className="left-arrow" onClick={prev}> &lt; </button>;

  return (
    <div>
      <h3>RELATED PRODUCTS</h3>
      <div className="list-container">
        <div className="scroll-button-container">
          {leftButton}
        </div>
        <div className="card-list" ref={listRef}>
          {props.products.map(({ product, metadata, styles }, i) =>
            <CardItem key={i} product={product} rating={metadata.rating} styles={styles} currentProduct={props.currentProduct} />
          )}
        </div>
        {rightButton}
      </div>
    </div>
  );
};

export default RelatedItemsList;

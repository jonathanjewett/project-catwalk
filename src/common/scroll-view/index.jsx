import React from 'react';
import './scroll-view.scss';

/** @param {HTMLElement} list */
const calculateItemWidth = (list) => {
  const firstItem = list.children[0];
  if (firstItem === undefined) {
    return 0;
  }
  const border = firstItem.offsetLeft - list.offsetLeft;
  return firstItem.offsetWidth + border * 2;
};

/**
 * @param {Object} props
 * @param {React.ReactChildren} props.children
 */
const ScrollView = (props) => {
  const ref = React.useRef();
  const [leftVisible, setLeftVisible] = React.useState(true);
  const [rightVisible, setRightVisible] = React.useState(true);
  const [itemWidth, setItemWidth] = React.useState(0);

  const toggleButtons = (offset) => {
    const list = ref.current;
    const children = list.children;
    if (children.length === 0) {
      setLeftVisible(false);
      setRightVisible(false);
    } else {
      const listRect = list.getBoundingClientRect();
      const itemRect = children[children.length - 1].getBoundingClientRect();
      setLeftVisible(list.scrollLeft + offset > 0);
      setRightVisible(listRect.right + offset < itemRect.right);
    }
  };

  const resizeListener = () => {
    const list = ref.current;
    setItemWidth(calculateItemWidth(list));
    toggleButtons(0);
  };

  React.useEffect(() => {
    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }, []);

  React.useEffect(resizeListener, [props.children]);

  const move = (offset) => {
    const list = ref.current;
    list.scrollTo({
      top: 0,
      left: list.scrollLeft + offset,
      behavior: 'smooth'
    });
    toggleButtons(offset);
  };

  const leftButton = leftVisible ? (
    <button
      type="button"
      className="left-arrow"
      onClick={() => move(-itemWidth)}
    >
      &lt;
    </button>
  ) : null;

  const rightButton = rightVisible ? (
    <button
      type="button"
      className="right-arrow"
      onClick={() => move(itemWidth)}
    >
      &gt;
    </button>
  ) : null;

  return (
    <div className="scrollview">
      <div className="scrollview-items" ref={ref}>
        {props.children}
      </div>
      {leftButton}
      {rightButton}
    </div>
  );
};

export default ScrollView;

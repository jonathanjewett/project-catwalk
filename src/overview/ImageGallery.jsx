import React from 'react';

/**
 * @param {Object} props
 * @param {boolean} props.expand
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setExpand
 * @param {Style} props.style
 */
const ImageGallery = ({ expand, setExpand, style }) => {
  const [page, setPage] = React.useState(0);
  React.useEffect(() => setPage(0), [style.style_id]);
  const adjustPage = (adjustBy) => (event) => {
    event.stopPropagation();
    setPage(i => i + adjustBy);
  };

  const leftButton = page === 0 ? null :
    <button type="button" className="prevStyle" onClick={adjustPage(-1)}>
      ←
    </button>;

  const rightButton = page === style.photos.length - 1 ? null :
    <button type="button" className="nextStyle" onClick={adjustPage(1)}>
      →
    </button>;

  return (
    <figure onClick={() => setExpand(state => !state)} style={{
      backgroundImage: `url(${style.photos[page].url})`,
      cursor: expand ? 'zoom-out' : 'zoom-in',
    }}>
      {leftButton}
      {rightButton}
    </figure>
  );
};

export default ImageGallery;

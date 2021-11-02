import React from 'react';

/**
 * @param {Object} props
 * @param {Style} props.style
 */
const ImageGallery = ({ style }) => {
  const [page, setPage] = React.useState(0);
  React.useEffect(() => setPage(0), [style.style_id]);
  const leftButton = page === 0 ? null :
    <button
      type="button"
      className="prevStyle"
      onClick={() => setPage(i => i - 1)}
    >←</button>;
  const rightButton = page === style.photos.length - 1 ? null :
    <button
      type="button"
      className="nextStyle"
      onClick={() => setPage(i => i + 1)}
    >→</button>;

  return (
    <figure>
      <div>
        <img src={style.photos[page].url}/>
      </div>
      {leftButton}
      {rightButton}
    </figure>
  );
};

export default ImageGallery;

import React from 'react';

/**
 * @param {Object} props
 * @param {string} props.src
 * @param {boolean} props.selected
 * @param {React.MouseEventHandler} props.onClick
 */
const Thumbnail = ({ src, selected, onClick }) => (
  <img
    src={src}
    className={selected ? 'selected' : null}
    onClick={onClick}
  />
);

const numThumbnails = 7;

/**
 * @param {Object} props
 * @param {boolean} props.expand
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setExpand
 * @param {Style} props.style
 */
const ImageGallery = ({ expand, setExpand, style }) => {
  // thumbnail offset for scrolling through more than `numThumbnails`
  const [thumbOffset, setThumbOffset] = React.useState(0);
  // index in `style.photos`
  const [page, setPage] = React.useState(0);
  // Reset state when style switches
  React.useEffect(() => {
    setPage(0);
    setThumbOffset(0);
  }, [style.style_id]);

  // Ensure the selected thumbnail is visible in the thumbnail list
  const scrollPage = (adjustBy) => (event) => {
    event.stopPropagation();
    const nextPage = page + adjustBy;
    if (nextPage < thumbOffset) {
      setThumbOffset(nextPage);
    } else if (nextPage > thumbOffset + numThumbnails - 1) {
      setThumbOffset(nextPage + 1 - numThumbnails);
    }
    setPage(nextPage);
  };

  const leftButton = page === 0 ? null :
    <button type="button" className="prevStyle" onClick={scrollPage(-1)}>
      ←
    </button>;

  const rightButton = page === style.photos.length - 1 ? null :
    <button type="button" className="nextStyle" onClick={scrollPage(1)}>
      →
    </button>;

  const thumbnails = style
    .photos
    .slice(thumbOffset, thumbOffset + numThumbnails)
    .map((photo, i) =>
      <Thumbnail
        src={photo.thumbnail_url}
        selected={i + thumbOffset === page}
        onClick={() => setPage(i + thumbOffset)}
        key={i + thumbOffset}
      />
    );

  const upButton = thumbOffset === 0
    ? <div/>
    : <button onClick={() => setThumbOffset(i => i - 1)}>⮝</button>;

  const downButton = thumbOffset + numThumbnails + 1 > style.photos.length
    ? <div/>
    : <button onClick={() => setThumbOffset(i => i + 1)}>⮟</button>;

  return (
    <figure onClick={() => setExpand(state => !state)} style={{
      backgroundImage: `url(${style.photos[page].url})`,
      cursor: expand ? 'zoom-out' : 'zoom-in',
    }}>
      <div
        className={expand ? 'thumbnails expand' : 'thumbnails'}
        onClick={(event) => event.stopPropagation()}
      >
        {upButton}
        {thumbnails}
        {downButton}
      </div>
      {leftButton}
      {rightButton}
    </figure>
  );
};

export default ImageGallery;

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
 * @param {{thumbnail_url: string, url: string}[]} props.photos
 * @param {number} page
 * @param {React.Dispatch<React.SetStateAction<number>>} props.setPage
 * @param {number} props.thumbOffset
 * @param {React.Dispatch<React.SetStateAction<number>>} props.setThumbOffset
 */
const Thumbnails = ({ photos, page, setPage, thumbOffset, setThumbOffset }) => {
  const thumbnails = photos
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

  const downButton = thumbOffset + numThumbnails + 1 > photos.length
    ? <div/>
    : <button onClick={() => setThumbOffset(i => i + 1)}>⮟</button>;

  return (
    <div className="thumbnails" onClick={event => event.stopPropagation()}>
      {upButton}
      {thumbnails}
      {downButton}
    </div>
  );
};

/**
 * Moves the background image of an element around so that it lines up with the
 * relative position of the cursor within that element.
 * @param {React.MouseEvent<HTMLElement>} event
 */
const scanZoomedImage = (event) => {
  const target = event.currentTarget;
  const bounds = target.getBoundingClientRect();
  const percentX = (event.clientX - bounds.x) / bounds.width;
  const percentY = (event.clientY - bounds.y) / bounds.height;
  target.style.backgroundPositionX = `${percentX * 100}%`;
  target.style.backgroundPositionY = `${percentY * 100}%`;
};

const zoomCursors = ['zoom-in', 'crosshair', 'zoom-out'];

/**
 * @param {Object} props
 * @param {boolean} props.zoom
 * @param {React.Dispatch<React.SetStateAction<number>>} props.setZoom
 * @param {Style} props.style
 */
const ImageGallery = ({ zoom, setZoom, style }) => {
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

  return (
    <figure
      onClick={() => setZoom(state => (state + 1) % 3)}
      className={`zoom-${zoom}`}
      style={{backgroundImage: `url(${style.photos[page].url})`}}
      onMouseMove={zoom === 2 ? scanZoomedImage : null}
    >
      <Thumbnails
        page={page}
        setPage={setPage}
        photos={style.photos}
        thumbOffset={thumbOffset}
        setThumbOffset={setThumbOffset}
      />
      {leftButton}
      {rightButton}
    </figure>
  );
};

export default ImageGallery;

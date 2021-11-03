import React from 'react';

/**
 * @param {Object} props
 * @param {Style} props.style
 * @param {boolean} props.selected
 * @param {React.MouseEventHandler} props.onClick
 */
const StyleButton = ({ style, selected, onClick }) => (
  <button
    type="button"
    style={{backgroundImage: `url(${style.photos[0].thumbnail_url})`}}
    onClick={onClick}
  >
    {selected ? <div>✓</div> : null}
  </button>
);

/**
 * @param {Object} props
 * @param {Style[]} props.styles
 * @param {Style} props.style
 * @param {React.Dispatch<React.SetStateAction<number>>} props.setStyleIndex
 */
const StyleSelector = ({ styles, style, setStyleIndex }) => {
  // Array of style buttons.
  const styleButtons = styles.map((st, i) =>
    <StyleButton
      key={st.style_id}
      style={st}
      selected={st.style_id === style.style_id}
      onClick={() => setStyleIndex(i)}
    />
  );

  // `styleButtons` split into chunks of four.
  const styleChunks = [];
  for (let i = 0; i < styleButtons.length; i += 4) {
    styleChunks.push(styleButtons.slice(i, i + 4));
  }

  // Rows of four style buttons at a time.
  const styleRows = styleChunks.map((chunk, i) =>
    <div key={i}>{chunk}</div>
  );

  return (
    <div className="styles">
      <p>
        <label>Style</label>
        <span className="stylename">{style.name}</span>
      </p>
      {styleRows}
    </div>
  );
};

export default StyleSelector;

import React from 'react';

/**
 * @param {Object} props
 * @param {Style[]} props.styles
 * @param {Style} props.style
 * @param {React.Dispatch<React.SetStateAction<number>>} props.setStyle
 */
const StyleSelector = ({ styles, style, setStyle }) => {
  // Array of style buttons.
  const styleButtons = styles.map((st, i) => {
    const checkmark = st.style_id === style.style_id ? <div>✓</div> : null;
    return (
      <button
        type="button"
        style={{backgroundImage: `url(${st.photos[0].thumbnail_url})`}}
        key={st.style_id}
        onClick={() => setStyle(i)}
      >
        {checkmark}
      </button>
    );
  });

  // `styleButtons` split into chunks of four.
  const styleChunks = [];
  for (let i = 0; i < styleButtons.length; i += 4) {
    styleChunks.push(styleButtons.slice(i, i + 4));
  }

  // Rows of four style buttons at a time.
  const styleRows = styleChunks.map((chunk, i) =>
    <div className="styles" key={i}>{chunk}</div>
  );

  return (
    <div>
      <p>
        <label>Style</label>
        <span className="stylename">{style.name}</span>
      </p>
      {styleRows}
    </div>
  );
};

export default StyleSelector;

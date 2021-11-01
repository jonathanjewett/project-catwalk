import React from 'react';

/**
 * @param {Object} props
 * @param {Style} props.style
 */
const AddToCart = ({ style }) => {
  const [quantity, setQuantity] = React.useState(0);
  const [expandSizes, setExpandSizes] = React.useState(false);
  const sizeRef = React.useRef(null);

  const sizeOptions = Object.entries(style.skus)
    .filter(([_, sku]) => sku.quantity > 0)
    .map(([id, sku]) =>
      <option key={id} value={sku.quantity}>{sku.size}</option>
    );

  const sizeSelect = sizeOptions.length === 0
    ? <select><option>OUT OF STOCK</option></select>
    : (
      <select
        size={expandSizes ? sizeOptions.length + 1 : 0}
        ref={sizeRef}
        onChange={(event) => {
          setQuantity(Number(event.target.value));
          sizeRef.current.setCustomValidity('');
          setExpandSizes(false);
        }}
        required
      >
        <option value="0">Select Size</option>
        {sizeOptions}
      </select>
    );

  let quantitySelect;
  if (quantity > 0) {
    const quantities = [];
    for (let i = 1; i <= quantity && i <= 15; i++) {
      quantities.push(<option key={i}>{i}</option>);
    }
    quantitySelect = <select>{quantities}</select>;
  } else {
    quantitySelect = <select disabled><option>-</option></select>;
  }

  const addToCart = sizeOptions.length === 0 ? null : (
    <button type="button" onClick={() => {
      if (quantity === 0) {
        setExpandSizes(true);
        sizeRef.current.setCustomValidity('You must select a size');
        sizeRef.current.focus();
      } else {
        console.log(quantity);
        // TODO add to cart with api
      }
    }}>
      Add to Cart
      <span>+</span>
    </button>
  );

  return (
    <div id="add-to-cart">
      <div>
        {sizeSelect}
        {quantitySelect}
      </div>
      {addToCart}
    </div>
  );
};

export default AddToCart;

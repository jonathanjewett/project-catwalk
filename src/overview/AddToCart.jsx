import React from 'react';
import api from '../api';

/**
 * @param {Object} props
 * @param {Style} props.style
 */
const AddToCart = ({ style }) => {
  // size of item the user wishes to purchase, as SKU
  const [size, setSize] = React.useState(null);
  const maxQuantity = size in style.skus ? style.skus[size].quantity : 0;
  // number of items the user wishes to purchase.
  const [quantity, setQuantity] = React.useState(0);
  // whether to expand the select-a-size menu in order to prompt the user.
  const [expandSizes, setExpandSizes] = React.useState(false);
  // reset state when style switches
  React.useEffect(() => {
    setSize(null);
    setQuantity(0);
    setExpandSizes(false);
  }, [style.style_id]);
  // reference to the select-a-size menu in order to display it as invalid
  const sizeRef = React.useRef(null);

  // the value of the select-a-size menu is how many of that size are in stock
  const sizeOptions = Object.entries(style.skus)
    .filter(([, sku]) => sku.quantity > 0)
    .map(([id, sku]) =>
      <option key={id} value={id}>{sku.size}</option>
    );

  const sizeSelect = sizeOptions.length === 0
    ? <select className="interact"><option>Out of Stock</option></select>
    : (
      <select
        className="interact"
        size={expandSizes ? sizeOptions.length + 1 : 0}
        ref={sizeRef}
        value={size || ''}
        onChange={event => {
          const id = event.target.value;
          if (id) {
            setSize(id);
            setQuantity(1);
            // un-invalidate the select-a-size menu
            setExpandSizes(false);
            sizeRef.current.setCustomValidity('');
          } else {
            setSize(null);
            setQuantity(0);
          }
        }}
        required
      >
        <option value="">Select Size</option>
        {sizeOptions}
      </select>
    );

  let quantitySelect;
  if (maxQuantity > 0) {
    const quantities = [];
    for (let i = 1; i <= maxQuantity && i <= 15; i++) {
      quantities.push(<option key={i}>{i}</option>);
    }
    quantitySelect =
      <select
        className="interact"
        value={quantity}
        onChange={event => setQuantity(Number(event.target.value))}
      >
        {quantities}
      </select>;
  } else {
    quantitySelect =
      <select className="interact" disabled>
        <option>-</option>
      </select>;
  }

  const addToCart = sizeOptions.length === 0 ? null : (
    <button type="button" id="add-to-cart" className="interact" onClick={() => {
      if (quantity === 0) {
        // Invalidate and expand the select-a-size menu.
        setExpandSizes(true);
        sizeRef.current.setCustomValidity('You must select a size');
        sizeRef.current.focus();
      } else {
        for (let i = 0; i < quantity; i++) {
          api.addToCart(size);
        }
      }
    }}>
      Add to Cart
      <span>+</span>
    </button>
  );

  return (
    <div className="add-to-cart">
      <div>
        {sizeSelect}
        {quantitySelect}
      </div>
      {addToCart}
    </div>
  );
};

export default AddToCart;

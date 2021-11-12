import React from 'react';

const ProductBreakdown = ({characteristics}) => {
  const characteristicNames = Object.keys(characteristics);
  const findCharacteristicRating = (characteristic, rating) => {
    if (rating === 'Low') {
      if (characteristic === 'Size') {
        return 'Too small';
      }
      if (characteristic === 'Width') {
        return 'Too narrow';
      }
      if (characteristic === 'Comfort') {
        return 'Uncomfortable';
      }
      if (characteristic === 'Quality') {
        return 'Poor';
      }
      if (characteristic === 'Length') {
        return 'Too short';
      }
      if (characteristic === 'Fit') {
        return 'Too tight';
      }
    }

    if (rating === 'High') {
      if (characteristic === 'Size') {
        return 'Too big';
      }
      if (characteristic === 'Width') {
        return 'Too wide';
      }
      if (characteristic === 'Comfort') {
        return 'Perfect';
      }
      if (characteristic === 'Quality') {
        return 'Perfect';
      }
      if (characteristic === 'Length') {
        return 'Too long';
      }
      if (characteristic === 'Fit') {
        return 'Too loose';
      }
    }
  };

  return (
    <div className="product-breakdown">
      {characteristicNames.map(characteristic => (
        <div className="characteristic-breakdown" key={characteristics[characteristic].id}>
          <label className="characteristic-label">{characteristic}</label>
          <br></br>
          <input className="interact"type="range" max="50000000000000000" min="1000000000000000" value={(characteristics[characteristic].value * 10000000000000000)} disabled={true}></input>
          <br></br>
          <label className="characteristic-low">
            {findCharacteristicRating(characteristic, 'Low')}
          </label>
          <label className="characteristic-high">
            {findCharacteristicRating(characteristic, 'High')}
          </label>
        </div>
      ))}
    </div>
  );
};

export default ProductBreakdown;


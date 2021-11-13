import React from 'react';

const ComparisonModal = (props) => {
  // refactor later after full implementation so it doesn't need this function
  const renderTableData = () => {
    // Make an array of all features between the two products
    const features = {};
    for (const { feature, value } of props.product1.features) {
      features[feature] = { value1: value, value2: null };
    }
    for (const { feature, value } of props.product2.features) {
      if (feature in features) {
        features[feature].value2 = value;
      } else {
        features[feature] = { value1: null, value2: value };
      }
    }

    // return table row
    return Object.entries(features).map(([feature, { value1, value2 }]) => {
      return (
        <tr key={feature}>
          <td>{value1}</td>
          <td>{feature}</td>
          <td>{value2}</td>
        </tr>
      );
    });
  };

  return (
    <div className="comparison-modal">
      <button type="button" onClick={props.close}>X</button>
      <table className="comparison-table">
        <caption className="table-title">Comparing</caption>
        <thead>
          <tr>
            <th>{props.product1.name}</th>
            <th></th>
            <th>{props.product2.name}</th>
          </tr>
        </thead>
        <tbody>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonModal;

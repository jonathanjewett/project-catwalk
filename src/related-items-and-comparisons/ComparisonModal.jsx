import React from 'react';

const ComparisonModal = (props) => {
  // refactor later after full implementation so it doesn't need this function
  const renderTableData = () => {
    var features = props.product1.features;
    return features.map((feature) => {
      console.log(feature.value);
      return (
        <tr key={feature.feature}>
          <td>{feature.value}</td>
          <td>{feature.feature}</td>
          <td>product2 Value</td>
        </tr>
      );
    });
  };

  return (
    <div className="comparison-modal">
      <button type="button" onClick={props.close}>X</button>
      <table className="comparison-table">
        <thead>
          <tr>
            <th>{props.product1.name}</th>
            <th></th>
            <th>product 2</th>
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
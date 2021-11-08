import React from 'react';

const ComparisonModal = (props) => {
  // refactor later after full implementation so it doesn't need this function
  const renderTableData = () => {
    var features = props.product1.features;
    /*
    var features = [];

    // Make an array of all features between the two products
    props.product1.features.map((feature) => features.push(feature.feature));
    for (var i = 0; i < props.product2.features.length; i++) {
      if (!features.includes(props.product2.features[i].feature)) {
        features.push(props.product2.features[i].feature);
      }
    }

    // Create object array with the features and values for each product
    for (var i = 0; i < features; i++) {

    }

    console.log(features);
    /*
    for (var i = 0; i < props.product2.product.features.length; i++) {
      if (!features.includes(props.product2.product.features[i].feature)) {
        features.push()
      }
    }
    */
    return features.map((feature) => {
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
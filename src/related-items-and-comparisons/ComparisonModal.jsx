import React from 'react';

const ComparisonModal = (props) => {
  // refactor later after full implementation so it doesn't need this function
  const renderTableData = () => {
    // Make an array of all features between the two products
    var features = [];
    props.product1.features.map((feature) => features.push(feature.feature));
    for (var i = 0; i < props.product2.features.length; i++) {
      if (!features.includes(props.product2.features[i].feature)) {
        features.push(props.product2.features[i].feature);
      }
    }

    // Create object array with the features and values for product1
    var featuresAndValues = [];
    for (var i = 0; i < features.length; i++) {
      // if product1 has feature, value1 is set, if not, value1 is null
      var valueAdded = false;
      for (var j = 0; j < props.product1.features.length; j++) {
        if (props.product1.features[j].feature === features[i]) {
          //console.log(props.product1.features[j].feature);
          featuresAndValues.push({feature: features[i], value1: props.product1.features[j].value, value2: null});
          valueAdded = true;
        }
      }

      // if the feature wasnt found in product1, value1 will be null
      if (valueAdded === false) {
        featuresAndValues.push({feature: features[i], value1: null, value2: null});
      }
    }

    // Iterate through featuresAndValues to add product2 values
    for (var i = 0; i < featuresAndValues.length; i++) {
      for (var j = 0; j < props.product2.features.length; j++) {
        if (props.product2.features[j].feature === featuresAndValues[i].feature) {
          featuresAndValues[i].value2 = props.product2.features[j].value;
        }
      }
    }

    // return table row
    return featuresAndValues.map((feature) => {
      return (
        <tr key={feature.feature}>
          <td>{feature.value1}</td>
          <td>{feature.feature}</td>
          <td>{feature.value2}</td>
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
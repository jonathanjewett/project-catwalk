import React from 'react';

const ComparisonModal = (props) => {
  return (
    <div className="comparison-modal">
      <button type="button" onClick={props.close}>X</button>
      <table className="comparison-table">
        <thead>
          <tr>
            <th>product 1</th>
            <th></th>
            <th>product 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>X</td>
            <td>Too Expensive</td>
            <td>X</td>
          </tr>
          <tr>
            <td></td>
            <td>Zombie Proof</td>
            <td>X</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonModal;
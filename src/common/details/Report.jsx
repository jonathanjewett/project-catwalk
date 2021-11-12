import React from 'react';
import api from '../../api';

/**
 * @param {Object} props
 * @param {'answer'|'question'|'review'} props.type
 * @param {number} props.id - answer_id, question_id, or review_id
 */
const Report = ({ type, id }) => {
  const [reported, setReported] = React.useState(false);
  if (reported) {
    return <em>Reported</em>;
  }

  const onClick = () => {
    setReported(true);
    api.report(type, id).catch(console.error);
  };

  return <a className="report" onClick={onClick}>Report</a>;
};

export default Report;

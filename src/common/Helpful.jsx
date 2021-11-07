import React from 'react';
import api from '../api';

/**
 * @param {Object} props
 * @param {number} props.score - helpfulness score
 * @param {'answer'|'question'|'review'} props.type
 * @param {number} props.id - answer_id, question_id, or review_id
 */
const Helpful = ({ score, type, id }) => {
  const [helpful, setHelpful] = React.useState(false);
  if (helpful) {
    return <span>Helpful? <em>Yes</em> ({score + 1})</span>;
  }

  const onClick = () => {
    setHelpful(true);
    api.markHelpful(type, id).catch(console.error);
  };

  return <span>Helpful? <a onClick={onClick}>Yes</a> ({score})</span>;
};

export default Helpful;

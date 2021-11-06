import React from 'react';
import moment from 'moment';

const formatName = (name) => name === 'Seller' ? <em>{name}</em> : name;

/**
 * @param {Object} props
 * @param {Answer} props.answer
 */
const AnswerTile = ({ answer }) => (
  <section>
    <p>{answer.body}</p>
    <footer className="details">
      <span>
        by {formatName(answer.answerer_name.trim())},
        {moment(answer.date).format(' MMMM, Do YYYY')}
      </span>
      <span>
        Helpful? <a>Yes</a> ({answer.helpfulness})
      </span>
      <span>
        <a>Report</a>
      </span>

    </footer>
  </section>
);

export default AnswerTile;

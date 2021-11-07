import React from 'react';
import moment from 'moment';
import { Helpful, Report } from '../common';

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
      <Helpful type="answer" id={answer.id} score={answer.helpfulness}/>
      <span>
        <Report type="answer" id={answer.id}/>
      </span>

    </footer>
  </section>
);

export default AnswerTile;

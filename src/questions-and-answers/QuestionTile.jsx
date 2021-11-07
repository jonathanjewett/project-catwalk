import React from 'react';
import AnswerTile from './AnswerTile';
import { Helpful } from '../common';
import api from '../api';

/**
 * @param {Object} props
 * @param {Question} props.question
 */
const QuestionTile = ({ question }) => {
  let [expand, setExpand] = React.useState(false);
  const answers = Object.entries(question.answers);
  answers.sort((x, y) => {
    const seller1 = x[1].answerer_name === 'Seller';
    const seller2 = y[1].answerer_name === 'Seller';
    return seller1 === seller2
      ? y[1].helpfulness - x[1].helpfulness
      : seller2 - seller1;
  });
  let accordionButton = null;
  if (answers.length > 2) {
    if (expand) {
      accordionButton =
        <button type="button" className="accordion" onClick={() => setExpand(false)}>
          Collapse Answers
        </button>;
    } else {
      answers.length = 2;
      accordionButton =
        <button type="button" className="accordion" onClick={() => setExpand(true)}>
          See More Answers
        </button>;
    }
  }
  return (
    <div>
      <span className="details">
        <Helpful
          type="question"
          id={question.question_id}
          score={question.question_helpfulness}
        />
        <span>
          <a>Add Answer</a>
        </span>
      </span>
      <h3>{question.question_body}</h3>
      <div className={answers.length > 0 ? 'answers' : null}>
        {answers.map(([id, answer]) => <AnswerTile key={id} answer={answer}/>)}
        {accordionButton}
      </div>
    </div>
  );
};

export default QuestionTile;

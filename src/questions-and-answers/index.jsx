import React from 'react';
import api from '../api';
import { ListView, Modal } from '../common';
import QuestionModal from './QuestionModal';
import QuestionTile from './QuestionTile';
import './questions-and-answers.scss';

/**
 * @param {Object} props
 * @param {Product} props.product
 * @param {Question[]} props.questions
 */
const QuestionsAndAnswers = ({ product, questions }) => {
  const [showModal, setShowModal] = React.useState(false);
  const modal = showModal ? (
    <QuestionModal hide={() => setShowModal(false)} product={product}/>
  ) : null;
  return (
    <div id="questions-and-answers">
      <ListView
        start={4}
        more="More Answered Questions"
        add="Add Question"
        onAdd={() => setShowModal(true)}
        placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
      >
        {questions.map(question =>
          <QuestionTile
            key={question.question_id}
            question={question}
            product={product}
          />
        )}
      </ListView>
      {modal}
    </div>
  );
};

export default QuestionsAndAnswers;

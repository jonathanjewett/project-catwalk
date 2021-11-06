import React from 'react';
import api from '../api';
import { ListView } from '../common';
import QuestionTile from './QuestionTile';
import './questions-and-answers.scss';

/**
 * @param {Object} props
 * @param {Question[]} props.questions
 */
const QuestionsAndAnswers = ({ questions }) => (
  <div id="questions-and-answers">
    <ListView
      start={4}
      more="More Answered Questions"
      add="Add Question"
      placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
    >
      {questions.map(question =>
        <QuestionTile key={question.question_id} question={question}/>
      )}
    </ListView>
  </div>
);

export default QuestionsAndAnswers;

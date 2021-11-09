import React from 'react';
import moment from 'moment';
import { Helpful, Modal, Report } from '../common';

const formatName = (name) => name === 'Seller' ? <em>{name}</em> : name;

/**
 * @param {Object} props
 * @param {Answer} props.answer
 */
const AnswerTile = ({ answer }) => {
  const [showModal, setShowModal] = React.useState(null);
  const modal = showModal && (
    <Modal full hide={() => setShowModal(false)}>
      <img src={showModal}/>
    </Modal>
  );
  const setModal = (event) => setShowModal(event.target.src);
  return (
    <section>
      <p>{answer.body}</p>
      {answer.photos.length === 0 ? null : (
        <p>
          {answer.photos.map(photo =>
            <img
              className="answer-thumbnail"
              src={photo}
              key={photo}
              onClick={setModal}
            />
          )}
        </p>
      )}
      <footer className="details">
        <span>
          by {formatName(answer.answerer_name.trim())},
          {moment(answer.date).format(' MMMM Do, YYYY')}
        </span>
        <Helpful type="answer" id={answer.id} score={answer.helpfulness}/>
        <span>
          <Report type="answer" id={answer.id}/>
        </span>
      </footer>
      {modal}
    </section>
  );
};

export default AnswerTile;

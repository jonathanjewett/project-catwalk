import React from 'react';
import './modal.scss';

/**
 * @param {Object} props
 * @param {React.ReactChildren} props.children
 * @param {React.MouseEventHandler} props.hide
 */
const Modal = ({ children, hide }) => (
  <div className="modalBack" onClick={hide} onScroll={event => event.preventDefault()}>
    <div className="modal" onClick={event => event.stopPropagation()}>
      {children}
    </div>
  </div>
);

export default Modal;

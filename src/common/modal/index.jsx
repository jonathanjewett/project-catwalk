import React from 'react';
import './modal.scss';

/**
 * @param {Object} props
 * @param {React.ReactChildren} props.children
 * @param {React.MouseEventHandler} props.hide
 * @param {boolean} full
 */
const Modal = ({ children, hide, full }) => (
  <div className="modalBack" onClick={hide}>
    <div
      className={'modal' + (full ? ' full' : '') }
      onClick={event => event.stopPropagation()}
    >
      {children}
    </div>
  </div>
);

export default Modal;

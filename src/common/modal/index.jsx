import React from 'react';
import './modal.scss';

/**
 * @param {Object} props
 * @param {React.ReactChildren} props.children
 * @param {React.MouseEventHandler} props.hide
 * @param {boolean} full
 */
const Modal = ({ children, hide, full }) => (
  <div role="dialog" className="modal-back" onClick={event => {
    if (event.target.className === 'modal-back') {
      hide(event);
    }
  }}>
    <div className={'modal' + (full ? ' full' : '') }>
      {children}
    </div>
  </div>
);

export default Modal;

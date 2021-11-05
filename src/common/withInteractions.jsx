import React from 'react';
import api from '../api';

const withInteractions = (Component, props) =>
  <Component onClick={(/** @type {React.MouseEvent} */ event) => api.logInteraction(
    event.target
  )}/>;

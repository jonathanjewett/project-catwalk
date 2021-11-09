import '@testing-library/jest-dom';
import axios from 'axios';
import api from './src/api';

const mock = {};
for (const method of ['GET', 'POST', 'PUT']) {
  mock[method.toLowerCase()] = (...args) => {
    const log = process.mockRequestLog;
    if (log) {
      args.unshift(method);
      log.push(args);
    }
    return Promise.resolve({results: []});
  };
}

api.initialize(mock);

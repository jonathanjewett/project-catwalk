import '@testing-library/jest-dom';
import 'regenerator-runtime';
import axios from 'axios';

jest.mock('axios', () => ({
  create: () => {
    const mock = {};
    for (const method of ['GET', 'POST', 'PUT']) {
      mock[method.toLowerCase()] = (...args) => {
        const log = process.mockRequestLog;
        if (log) {
          args.unshift(method);
          log.push(args);
        }
      };
    }
    return mock;
  }
}));

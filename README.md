# Project Catwalk

![tests](https://github.com/Team-Asteraceae/project-catwalk/actions/workflows/node.js.yml/badge.svg) [![codecov](https://codecov.io/gh/Team-Asteraceae/project-catwalk/branch/main/graph/badge.svg?token=IWOPASQ45P)](https://codecov.io/gh/Team-Asteraceae/project-catwalk)

## Development Server

- Copy [`.env.example`](./.env.example) to a new file named `.env` and fill in the `VITE_API_TOKEN` field with a [GitHub token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/). You may also want to replace the `VITE_API` field with the endpoint of your own API server.
- Run `npm install` to install dependencies.
- Start your application with `npm run start`.
- Visit [http://localhost:3000](http://localhost:3000).

## Production Server

### Building

```javascript
npm install
npm run build:client
npm run build:server
```

### Running

- Set the following environment variables:
  - `PORT`: port to which the server should bind
  - `VITE_API`: endpoint URL for the API server, e.g. `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp`
  - `VITE_API_TOKEN`: [GitHub token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)
  - `PRODUCT_CACHE_SECONDS`: number of seconds before a product's information expires from the server-side cache
  - `PRODUCT_CACHE_SIZE`: maximum number of products to store in the cache
-  Start your application with `npm run serve`.

# Project Catwalk

![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![html](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![css](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

![animation4](https://user-images.githubusercontent.com/57540412/152917377-f3d5b366-ca4a-4439-ad3b-0226b4126541.gif)

This is a Hack Reactor front end capstone. We were approached by a client to update an old e-commerce front end to boost sales and activity.

## Related Products and Your Outfits

I was responsible for the component that displayed related products and an outfit list created and managed by the user. It mainly consisted of two carousels, one that showed related products and another that showed the user's outfit, which consisted of products added by the user. Each carousel cycles left and right, with the arrows on either side only appearing if there are cards left to view on their respective sides. For the related products section, each card has a products image, its category, price (sales price in red if relevant), and its star rating. The top right of the card has a star, which opens the comparison modal. This modal shows comparisons between the product on the current page and the product card where the star was clicked.

The "Your Outfit" carousel has a button for adding the current product on the page to the list, with the same information on each card as the related products cards while replacing the star with an X icon, which removes the product from the outfit list when clicked. If the outfit list becomes long enough, the carousel will be cyclable similarly to the "Related Products" carousel.

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

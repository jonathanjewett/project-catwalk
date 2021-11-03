export const products = [
  {
    "id": 1,
    "name": "Camo Onesie",
    "slogan": "Blend in to your crowd",
    "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
    "category": "Jackets",
    "default_price": "140"
  },
  {
    "id": 2,
    "name": "Bright Future Sunglasses",
    "slogan": "You've got to wear shades",
    "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
    "category": "Accessories",
    "default_price": "69"
  },
  {
    "id": 3,
    "name": "Morning Joggers",
    "slogan": "Make yourself a morning person",
    "description": "Whether you're a morning person or not. Whether you're gym bound or not. Everyone looks good in joggers.",
    "category": "Pants",
    "default_price": "40"
  },
  {
    "id": 4,
    "name": "Earmuffs",
    "slogan": "Keep your ears warm",
    "description": "Keep the cold out of your brain by wearing earmuffs!",
    "category": "Accessories",
    "default_price": "50"
  },
  {
    "id": 5,
    "name": "Track Jacket",
    "slogan": "When you want to look athletic at the movies",
    "description": "This is your standard track jacket that you think will be warm but then realize its not nearly thick enough.",
    "category": "Jackets",
    "default_price": "100"
  },
  {
    "id": 6,
    "name": "Sadboi Hoodie",
    "slogan": "For fans of Raleigh Ritchie",
    "description": "Not gonna lie I only put this in here because one of his songs is playing right now",
    "category": "Hooded Sweater",
    "default_price": "65"
  },
  {
    "id": 7,
    "name": "Sliders",
    "slogan": "For those that wear house slippers",
    "description": "Reds the best color.",
    "category": "Shoes",
    "default_price": "25"
  },
  {
    "id": 8,
    "name": "T-shirt",
    "slogan": "The shirt for the everyday",
    "description": "This shirt comes in multiple colors and is great for just about any activity.",
    "category": "T-Shirts",
    "default_price": "15"
  },
  {
    "id": 9,
    "name": "Socks",
    "slogan": "Add a layer between your feet and your footwear",
    "description": "I'm clearly running out of ideas for products.",
    "category": "Accessories",
    "default_price": "5"
  },
  {
    "id": 10,
    "name": "Suede Jacket",
    "slogan": "Its fancy because its suede",
    "description": "Fuzzy leather jacket for the fashion forward. Suede is also an English rock band apparently.",
    "category": "Jacket",
    "default_price": "100"
  }
  // ...
];

export const stylesForProducts = {
  "product_id": "1",
  "results": [
    {
      "style_id": 1,
      "name": "Forest Green & Black",
      "original_price": "140",
      "sale_price": "0",
      "default?": true,
      "photos": [
        {
          "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
          "url": "urlplaceholder/style_1_photo_number.jpg"
        },
        {
          "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
          "url": "urlplaceholder/style_1_photo_number.jpg"
        }
        // ...
      ],
      "skus": {
        "37": {
          "quantity": 8,
          "size": "XS"
        },
        "38": {
          "quantity": 16,
          "size": "S"
        },
        "39": {
          "quantity": 17,
          "size": "M"
        },
        //...
      }
    },
    {
      "style_id": 2,
      "name": "Desert Brown & Tan",
      "original_price": "140",
      "sale_price": "0",
      "default?": false,
      "photos": [
        {
          "thumbnail_url": "urlplaceholder/style_2_photo_number_thumbnail.jpg",
          "url": "urlplaceholder/style_2_photo_number.jpg"
        }

      ],
      "skus": {
        "37": {
          "quantity": 8,
          "size": "XS"
        },
        "38": {
          "quantity": 16,
          "size": "S"
        },
        "39": {
          "quantity": 17,
          "size": "M"
        },

      }
    }]

};

export const relatedProducts = [
  2,
  3,
  8,
  7
];
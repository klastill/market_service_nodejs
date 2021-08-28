const categories = [
  {
    "_id": 1,
    "name": "a"
  },
  {
    "_id": 2,
    "name": "b"
  },
  {
    "_id": 3,
    "name": "c"
  },
  {
    "_id": 4,
    "name": "d"
  },
  {
    "_id": 5,
    "name": "e"
  }
];

const price = [
  {
    "_id": 0,
    "name": "any",
    "array": []
  },
  {
    "_id": 1,
    "name": "$0 to $199",
    "array": [0, 199]
  },
  {
    "_id": 2,
    "name": "$200 to $299",
    "array": [200, 299]
  },
  {
    "_id": 3,
    "name": "$300 to $399",
    "array": [300, 399]
  },
  {
    "_id": 4,
    "name": "$400 to $499",
    "array": [400, 499]
  },
  {
    "_id": 5,
    "name": "over $500",
    "array": [500, 10000000]
  },
];

export {
  categories,
  price
}
const faker = require("faker");
const _ = require("lodash");

/**
 * TODO: fetch data from db
 */

// const users = generateUsers(10);
export const contacts = _.mapKeys({}, "user_id");

// example of how the state object is structured
export const state = {
  user: generateUser(),
  messages: [],
  typing: "",
  contacts,
  activeUserId: null
};

/**
 * @returns {Object} - a new user object
 */
export function generateUser() {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    profile_pic: faker.internet.avatar(),
    status: faker.lorem.sentence()
  };
}


// function generateUsers(numberOfUsers) {
//   return Array.from({ length: numberOfUsers }, () => generateUser());
// }

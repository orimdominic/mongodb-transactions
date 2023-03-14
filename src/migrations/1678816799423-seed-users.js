require("dotenv").config();
const { connectToDB } = require("../config/database");
const { faker } = require("@faker-js/faker");
const UserModel = require("../model/user.model");

/**
 * Make any changes you need to make to the database here
 */
async function up() {
  // Write migration here
  await connectToDB();

  const users = Array.from(new Array(5)).map(() => ({
    email: faker.internet.email().toLowerCase(),
    balance: Number(faker.random.numeric(2)),
  }));

  await UserModel.create(users);
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {
  // Write migration here
}

module.exports = { up, down };

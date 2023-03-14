const UserModel = require("../model/user.model");

async function getUsers(req, res, next) {
  try {
    const users = await UserModel.find({});
    return res.json({
      docs: users.map((user) => ({
        id: user._id,
        email: user.email,
        balance: user.balance,
      })),
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUsers
}
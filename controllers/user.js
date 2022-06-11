const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
  updateUser: async (req, res) => {
    try {
      let userData = req.body;
      let userExists = await User.findOne({
        email: req.body.email,
      });

      // if new user name is already existing in db
      let newUserNameAlreadyExists = await User.findOne({
        userName: req.body.userName,
        email: { $ne: req.body.email },
      });
      if (newUserNameAlreadyExists) {
        return res.status(409).json({ message: "User name already exists" });
      }

      // if user does not exist, create the new user
      if (!userExists) {
        let hash = bcrypt.hashSync(req.body.password, 10);
        let user = await User.create({ ...req.body, password: hash });
        return res.status(200).send({ message: "New user created", user });
      }

      // if user exists check password before updating
      let passwordMatched = bcrypt.compareSync(
        req.body.password,
        userExists.password
      );
      if (!passwordMatched) {
        return res.status(409).json({ message: "Incorrect Password" });
      }

      let user = await User.findOneAndUpdate(
        { email: req.body.email },
        { ...userData, password: userExists.password },
        {
          new: true,
        }
      );
      res.status(200).json({ message: "User updated", user });
    } catch (err) {
      res.status(500).send(err);
    }
  },
};

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const UserController = {
  signup: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      console.log('check 0');

      const user = await User.findOne({ email });
      console.log('check 1');
      console.log(user);
      if (user) return res.status(404).json({ msg: 'User already exsists' });
      console.log('check 2');

      const hashedPass = await bcrypt.hash(password, 12);
      const newUser = {
        email,
        password: hashedPass,
      };
      console.log('check 3');

      const createdUser = await User.create(newUser);
      console.log('check 4');

      const token = jwt.sign(
        { userId: createdUser },
        process.env.TOKEN_SECRETE,
        {
          expiresIn: '10h',
        }
      );
      res.status(200).json({ user: createdUser, token });
    } catch (error) {
      res.status(500).json({ msg: 'Internal server error' });
    }
  },
};

module.exports = UserController;

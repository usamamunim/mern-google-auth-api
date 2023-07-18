const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const UserController = {
  login: async (req, res) => {
    try {
      console.log('login action');
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !bcrypt.compareSync(password, user.password))
        return res.status(404).json({ msg: 'Invalid credentials' });

      const token = await jwt.sign(
        { userId: user },
        process.env.TOKEN_SECRETE,
        {
          expiresIn: '10h',
        }
      );
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json({ msg: 'Internal server error' });
    }
  },
  signup: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(req.body);

      const user = await User.findOne({ email });
      if (user) return res.status(404).json({ msg: 'User already exsists' });

      const hashedPass = await bcrypt.hash(password, 12);
      const newUser = {
        email,
        password: hashedPass,
      };

      const createdUser = await User.create(newUser);

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

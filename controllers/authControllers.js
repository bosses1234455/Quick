const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const withDB = require('../middleware/withDB');

const login =withDB(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Set the JWT token in an HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true, // Prevents JavaScript access to the cookie
      secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
      sameSite: 'strict', // Protects against CSRF
      maxAge: 24 * 60 * 60 * 1000 // 24 hours in milliseconds
    });

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        mail: user.mail
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

const register = withDB(async (req,res) => {
    try {
        const {username,mail,password} = req.body;

        const existingUser = await User.findOne({mail});
        if(existingUser){
            return res.status(400).json({error:'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            username,
            mail,
            hashed_password: hashedPassword
        })
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
          );
          res.cookie('token', token, {
            httpOnly: true, // Prevents JavaScript access to the cookie
            secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
            sameSite: 'strict', // Protects against CSRF
            maxAge: 24 * 60 * 60 * 1000 // 24 hours in milliseconds
          });
          res.status(201).json({
            user: {
              id: user._id,
              name: user.name,
              mail: user.mail
            }
          });
    } catch (error) {
        console.error('Registration error:', error);
    }
});

module.exports = {
  login,
  register
};
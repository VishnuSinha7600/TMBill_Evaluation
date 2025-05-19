const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer')

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;


    console.log('Register request body:', req.body);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('Login request body:', req.body);
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1d' });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Reset Password route
router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // ✅ Hash the new password before saving
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    // ✅ Setup Nodemailer mock transport inside route
    const transporter = nodemailer.createTransport({
      streamTransport: true,
      newline: 'unix',
      buffer: true,
    });

    const message = {
      from: 'noreply@yourapp.com',
      to: user.email,
      subject: 'Password Reset Confirmation',
      text: `Hello ${user.username}, your password has been successfully reset.`,
    };

    const info = await transporter.sendMail(message);
    console.log('Mock email sent:\n', info.message.toString());

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Reset Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});





module.exports = router;


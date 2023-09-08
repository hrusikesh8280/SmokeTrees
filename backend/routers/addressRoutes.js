const express = require('express');
const router = express.Router();
const Address = require('../models/addressModel');
const User = require('../models/userModel');


router.post('/', async (req, res) => {
  try {

    const { street, city, state, postalCode, userId } = req.body;


    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newAddress = new Address({
      street,
      city,
      state,
      postalCode,
      user: userId,
    });

    await newAddress.save();

    res.status(201).json({ message: 'Address stored successfully', address: newAddress });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

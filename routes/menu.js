const express = require('express');
const router = express.Router();

const Menu = require('../models/menu');

// Get Menus
router.get('/randomize-menu', async (req, res) => {
  try {
    const data = await Menu.find();

    //loop through the array in reverse order
    // and swap each element with a random index
    for (let i = data.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Pick a random index
      [data[i], data[j]] = [data[j], data[i]]; // Swap elements
    }

    res.status(200).json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: 'Server Error',
    });
  }
});

// Get Menus
router.get('/', async (req, res) => {
  try {
    const data = await Menu.find();

    res.status(200).json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: 'Server Error',
    });
  }
});

// Add Menu
router.post('/add-menu', async (req, res) => {
  try {
    const { name, ingredients, hasMeat } = req.body;
    const newMenu = new Menu({
      name,
      ingredients,
      hasMeat,
    });
    const menu = await newMenu.save();
    res.status(200).json({ menu: menu, msg: 'Menu Added Successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: 'Server Error',
    });
  }
});

// Update Menu
router.put('/update-menu/:id', async (req, res) => {
  try {
    const { name, ingredients, hasMeat } = req.body;

    const menu = await Menu.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { name, ingredients, hasMeat } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(200).json({ menu: menu, msg: 'Menu Updated Successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: 'Server Error',
    });
  }
});

// Delete Menu
router.delete('/delete-menu/:id', async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'Menu Deleted Successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: 'Server Error',
    });
  }
});

module.exports = router;

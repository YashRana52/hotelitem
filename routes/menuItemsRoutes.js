const MenuItem = require('./../models/MenuItem');
const express = require('express');
const router = express.Router();

// get routes to add menu
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        console.log('Data saved');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// GET route to fetch all menu items
router.get('/', async (req, res) => {
    try {
        const menuItems = await MenuItem.find();  // Fetch all menu items
        console.log('Data retrieved');
        res.status(200).json(menuItems);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }

})
// taste type k liye code

router.get('/:taste', async (req, res) => {
    const tasteType = req.params.taste; 
    try {
        if (tasteType === 'spicy' ||tasteType === 'sweet' || tasteType === 'sour') {
            const response = await MenuItem.find({ taste: tasteType });
            console.log('Response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid taste type' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//put operation in menu

router.put('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;  // Extract ID from URL
        const updatedmenuData = req.body;  // Data to update the person with

        const response = await MenuItem.findByIdAndUpdate(
            menuId,
            updatedmenuData,
            { new: true, runValidators: true }  // Options: return updated doc and run validators
        );
        if (!response) {
            return res.status(404).json({ error: 'menu not found' });
        }

        console.log('menu data updated');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//delete operation in menu items


router.delete('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;  // Extract the person ID from the URL

        const response = await MenuItem.findByIdAndDelete(menuId);
        
        if (!response) {
            return res.status(404).json({ error: 'menu not found' });
        }
        
        console.log('menu item deleted');
        res.status(200).json({ message: 'menu  deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});





module.exports = router;
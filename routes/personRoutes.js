const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

// POST route to add a person
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('Data saved', response);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET route to fetch all persons
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();  // Fetch all persons
        console.log('Data fetched');
        res.status(200).json(data);  // Return the fetched data
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET route to fetch persons by work type
router.get('/:workType', async (req, res) => {
    const workType = req.params.workType;  // Extract the work type from URL parameter
    try {
        if (['chef', 'manager', 'waiter'].includes(workType)) {
            const response = await Person.find({ work: workType });
            console.log('Response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid work type' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT route to update a person by ID
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;  // Extract ID from URL
        const updatedPersonData = req.body;  // Data to update the person with

        const response = await Person.findByIdAndUpdate(
            personId,
            updatedPersonData,
            { new: true, runValidators: true }  // Options: return updated doc and run validators
        );
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('Data updated');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE route to delete a person by ID
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;  // Extract the person ID from the URL

        const response = await Person.findByIdAndDelete(personId);
        
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        
        console.log('Data deleted');
        res.status(200).json({ message: 'Person deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;

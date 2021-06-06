const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Getting all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
        
    } catch (err) {
        res.status(500).json({msg: error.message});
        
    }
});

// Getting one user
router.get('/:id', getUser, (req, res) => {
    res.send(res.user.name);
});


// Creating a user
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email
    });

    try {
        
        const newUser = await user.save();
        res.json(newUser);
        res.status(201).json(newUser);
        
    } catch (err) {
        res.status(400).json({ msg: err.message });
        
    }

});

// Updating a user
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name;
    }
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ msg: err.message});
    }

});

// Deleting a user
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({ msg: 'Removed User'});
        
    } catch (err) {
        res.status(500).json({ msg: err.message});
    }
    


});

async function getUser(req, res, next) {
    try {
        const user = await User.findById(req.params.id);
        if(user == null){
            return res.status(404).json({ msg: 'Cannot find user'});
        }
        res.user = user;
        next();
        
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};
module.exports = router;
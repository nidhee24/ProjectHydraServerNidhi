const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();
let Room = require('../model/room');
router.get('/', async (req, res) => {          //To display the details of rooms 
    try {
      const rooms = await Room.find();
      res.send(rooms);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });

router.post(           // To insert details of rooms
    '/',auth,
    [
        check('firstname','First Name is required').not().isEmpty(),
        check('lastname','Last Name is required').not().isEmpty(),
       //check('email', 'Please enter a Valid email').isEmail(),
        check('checkin','Check in date is required').not().isEmpty(),
        check('checkout','Check out date is required').not().isEmpty()
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors: errors.array() });
        }
    
    try {
        const newRoom = new Room({
            user: req.user.id,
            firstname : req.body.firstname,
            lastname: req.body.lastname,
           //email : req.body.email,
            checkin: req.body.checkin,
            checkout: req.body.checkout
        });

        await newRoom.save();
        const payload = {
            room : {
                id: newRoom.id,
                firstname: newRoom.firstname,
                lastname: newRoom.lastname,
               // email: newRoom.email,
                checkin: newRoom.checkin,
                checkout: newRoom.checkout
            },
        };
        const result = await newRoom.save();
        res.send(result);
        
    }
    catch(err){
        res.status(500).send(err.message);
    }
}
);

router.delete('/', auth, async (req, res) => {
    try {
        console.log("Delete");
      const room = await Room.findById(req.body.id);
      if (!room) {
        return res.status(404).json({ msg: 'Details not found' });
      }
      const result = await Room.findByIdAndDelete(req.body.id);
      console.log(result);
      res.send(result);
    } catch (err) {
      res.status(500).send('Server error');
    }
});

router.put('/', auth,
  [
    check('firstname','First Name is required').not().isEmpty(),
    check('lastname','Last Name is required').not().isEmpty(),
   // check('email', 'Please enter a Valid email').isEmail(),
    check('checkin','Check in date is required').not().isEmpty(),
    check('checkout','Check out date is required').not().isEmpty()
  ], async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const room = await Room.findById(req.body.id);
      if (!room) {
        return res.status(404).json({ msg: 'Task not found' });
      } 
      room.firstname = req.body.firstname;
      room.lastname = req.body.lastname;
      room.checkin = req.body.checkin;
      room.checkout = req.body.checkout;
      await room.save();
      res.send(room);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });

module.exports = router;
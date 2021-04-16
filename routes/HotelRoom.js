const express = require('express');

const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');

const router = express.Router();
let HotelRoom1 = require('../model/hotelroom');
router.get('/', async (req, res) => {
    try {
      const hotelroom1 = await HotelRoom1.find();
      res.send(hotelroom1);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });

router.post(
    '/',auth,
    [
        check('name','Name is required').not().isEmpty(),
        check('price','Price is required').not().isEmpty(),
        check('image','Image is required').not().isEmpty()
        
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors: errors.array() });
        }
    
    try {
        const newHotelRoom = new HotelRoom1({
            user: req.user.id,
            name : req.body.name,
            price: req.body.price,
            image: req.body.image
        });

        await newHotelRoom.save();
        const payload = {
            hotelroom1 : {
                id: newHotelRoom.id,
                name: newHotelRoom.name,
                price: newHotelRoom.price,
                image: newHotelRoom.image              
            },
        };
        const result = await newHotelRoom.save();
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
      const hotelroom1 = await HotelRoom1.findById(req.body.id);
      if (!hotelroom1) {
        return res.status(404).json({ msg: 'Hotel Room details is not found' });
      }
      const result = await HotelRoom1.findByIdAndDelete(req.body.id);
      console.log(result);
      res.send(result);
    } catch (err) {
      res.status(500).send('Server error');
    }
});

router.put('/', auth,
  [
    check('name','Name is required').not().isEmpty(),
        check('price','Price is required').not().isEmpty(),
        check('image','Image is required').not().isEmpty()
  ], async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const hotelroom1 = await HotelRoom1.findById(req.body.id);
      if (!hotelroom1) {
        return res.status(404).json({ msg: 'Hotel Rooms Detail is not found' });
      } 
      hotelroom1.name = req.body.name;
      hotelroom1.price = req.body.price;
      hotelroom1.image = req.body.image;
      
      await hotelroom1.save();
      res.send(hotelroom1);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });
module.exports = router;
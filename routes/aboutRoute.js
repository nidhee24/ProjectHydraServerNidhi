const express = require('express');

const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');

const router = express.Router();
let About = require('../model/about');
router.get('/', async (req, res) => {
    try {
      const about = await About.find();
      res.send(about);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });

router.post(
    '/',auth,
    [
        check('details','Details is required').not().isEmpty(),
        
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors: errors.array() });
        }
    
    try {
        const newAbout = new About({
            user: req.user.id,
            details : req.body.details,
        });

        await newAbout.save();
        const payload = {
            about : {
                id: newAbout.id,
                details: newAbout.details,
              
            },
        };
        const result = await newAbout.save();
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
      const about = await About.findById(req.body.id);
      if (!about) {
        return res.status(404).json({ msg: 'About detail is not found' });
      }
      const result = await About.findByIdAndDelete(req.body.id);
      console.log(result);
      res.send(result);
    } catch (err) {
      res.status(500).send('Server error');
    }
});

router.put('/', auth,
  [
    check('details','Details is required').not().isEmpty(),
  ], async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const about = await About.findById(req.body.id);
      if (!about) {
        return res.status(404).json({ msg: 'About Detail is not found' });
      } 
      about.details = req.body.details;
      
      await about.save();
      res.send(about);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });
module.exports = router;
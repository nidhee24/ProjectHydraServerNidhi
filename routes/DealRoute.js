const express = require('express');

const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');

const router = express.Router();
let Deal = require('../model/deals');
router.get('/', async (req, res) => {
    try {
      const deal = await Deal.find();
      res.send(deal);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });

router.post(
    '/',auth,
    [
        check('deal','Deal is required').not().isEmpty(),
        check('image','Image is required').not().isEmpty(),
        
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors: errors.array() });
        }
    
    try {
        const newDeal = new Deal({
            user: req.user.id,
            deal : req.body.deal,
            image: req.body.image
        });

        await newDeal.save();
        const payload = {
            deal : {
                id: newDeal.id,
                deal: newDeal.deal,
                image: newDeal.image              
            },
        };
        const result = await newDeal.save();
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
      const deal = await Deal.findById(req.body.id);
      if (!deal) {
        return res.status(404).json({ msg: 'Deal is not found' });
      }
      const result = await Deal.findByIdAndDelete(req.body.id);
      console.log(result);
      res.send(result);
    } catch (err) {
      res.status(500).send('Server error');
    }
});

router.put('/', auth,
  [
    check('deal','Deal is required').not().isEmpty(),
    check('image','Image is required').not().isEmpty(),
  ], async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const deal = await Deal.findById(req.body.id);
      if (!deal) {
        return res.status(404).json({ msg: 'Deal is not found' });
      } 
      deal.deal = req.body.deal;
      deal.image = req.body.image;
      
      await deal.save();
      res.send(deal);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });

module.exports = router;
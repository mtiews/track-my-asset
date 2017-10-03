const express = require('express');
const router = express.Router();

const persistence = require('../persistence.js');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('Asset API');
});

router.get('/assets', (req, res) => {
  res.json(persistence.getAllAssets());
});

router.post('/assets', (req, res) => {
  res.json(persistence.createAsset(req.body));
});

module.exports = router;
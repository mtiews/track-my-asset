const express = require('express');
const router = express.Router();

const persistence = require('../persistence.js');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('Asset API');
});

router.get('/assets', (req, res) => {
  console.log('GET Assets');
  res.json(persistence.getAllAssets());
});

router.get('/assets/:id', (req, res) => {
  console.log('GET Asset: ' + req.params.id);
  res.json(persistence.getAssetById(req.params.id));
});

router.post('/assets', (req, res) => {
  console.log('POST Asset');
  res.json(persistence.createAsset(req.body));
});

router.put('/assets/:id', (req, res) => {
  console.log('PUT Asset: ' + req.params.id);
  res.json(persistence.updateAsset(req.body));
});

router.delete('/assets/:id', (req,res) => {
  console.log('DELETE Asset: ' + req.params.id);
  res.json(persistence.deleteAsset(req.params.id));
});

module.exports = router;
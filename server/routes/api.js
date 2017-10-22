const express = require('express');
const router = express.Router();

const persistence = require('../persistence.js');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('Asset API');
});

router.get('/assets', (req, res) => {
  console.log('GET Assets');
  res.json(persistence.getAllAssetsByOwner(req.user.email));
});

router.get('/publicassets', (req, res) => {
  console.log('GET Public Assets');
  var assetList = persistence.getPublicAssets();
  // hide possible private data
  assetList.forEach(asset => {
    //asset.owner = null;
  });
  res.json(assetList);
});

router.get('/assets/:id', (req, res) => {
  console.log('GET Asset: ' + req.params.id);
  var asset = persistence.getAssetById(req.params.id);
  if(asset && (asset.owner === req.user.email || asset.visibility === 'public')) {
    res.json(asset);
  } else {
    res.status(403).send("Access Denied");
  }
});

router.post('/assets', (req, res) => {
  console.log('POST Asset');
  req.owner = req.user.email;
  res.json(persistence.createAsset(req.body));
});

router.put('/assets/:id', (req, res) => {
  console.log('PUT Asset: ' + req.params.id);
  var asset = persistence.getAssetById(req.params.id);
  if(asset && asset.owner === req.user.email) {
    res.json(persistence.updateAsset(req.body));
  } else {
    res.status(403).send("Access Denied");
  }
});

router.delete('/assets/:id', (req,res) => {
  console.log('DELETE Asset: ' + req.params.id);
  var asset = persistence.getAssetById(req.params.id);
  if(asset && asset.owner === req.user.email) {
    res.json(persistence.deleteAsset(req.params.id));
  } else {
    res.status(403).send("Access Denied");
  }
});

module.exports = router;
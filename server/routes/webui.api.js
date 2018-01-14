const express = require('express');
const router = express.Router();

const persistence = require('../persistence.js');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('Web UI API');
});

router.get('/assets', (req, res) => {
  console.log('WebUI API - GET Assets');
  res.json(persistence.getAllAssetsByOwner(req.user.email));
});

router.get('/publicassets', (req, res) => {
  console.log('WebUI API - GET Public Assets');
  var assetList = persistence.getPublicAssets();
  // hide possible private data
  assetList.forEach(asset => {
    asset.owner = null;
    asset.secret = null;
  });
  res.json(assetList);
});

router.get('/assets/:id', (req, res) => {
  console.log('WebUI API - GET Asset: ' + req.params.id);
  var asset = persistence.getAssetById(req.params.id);
  if(asset) {
    if((asset.owner === req.user.email || asset.visibility === 'public')) {
      res.json(asset);
    } else {
      res.status(403).send("Access Denied");
    }
  } else {
    res.status(404).send("Asset Not Found");
  }
});

router.post('/assets', (req, res) => {
  console.log('WebUI API - POST Asset');
  req.body.owner = req.user.email;
  res.json(persistence.createAsset(req.body));
});

router.put('/assets/:id', (req, res) => {
  console.log('WebUI API - PUT Asset: ' + req.params.id);
  var asset = persistence.getAssetById(req.params.id);
  if(asset && asset.owner === req.user.email) {
    res.json(persistence.updateAsset(req.body));
  } else {
    res.status(403).send("Access Denied");
  }
});

router.delete('/assets/:id', (req,res) => {
  console.log('WebUI API - DELETE Asset: ' + req.params.id);
  var asset = persistence.getAssetById(req.params.id);
  if(asset && asset.owner === req.user.email) {
    res.json(persistence.deleteAsset(req.params.id));
  } else {
    res.status(403).send("Access Denied");
  }
});

router.delete('/assets/:id/datapoints/:dpid', (req,res) => {
  console.log('WebUI API - DELETE Asset Datapoint: ' + req.params.id + "/ Datapoint:" + req.params.dpid);
  var asset = persistence.getAssetById(req.params.id);
  if(asset && asset.owner === req.user.email) {
    res.json(persistence.deleteAssetDatapoint(req.params.id, req.params.dpid));
  } else {
    res.status(403).send("Access Denied");
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();

const persistence = require('../persistence.js');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('Asset API');
});

router.get('/:id', (req, res) => {
  console.log('Asset API - GET Asset');
  var asset = persistence.getAssetById(req.params.id);
  if(asset) {
    var secret = req.query['api_secret'];
    if(secret !== asset.secret) {
      res.status(403).send("Forbidden");
      return;
    }
    // Extract common fields
    var ts = null;
    if(req.query['api_timestamp']) {
      ts = parseInt(req.query['api_timestamp']);
      if(isNaN(ts)) {
        ts = new Date().getTime();
      }
    }
    else {
      ts = new Date().getTime();
    }
    var gps_lat = null;
    if(req.query['gps_lat']) {
      gps_lat = parseFloat(req.query['gps_lat']);
      if(isNaN(gps_lat)) {
        gps_lat = null;
      }
    }
    var gps_lon = null;
    if(req.query['gps_lon']) {
      gps_lon = parseFloat(req.query['gps_lon']);
      if(isNaN(gps_lon)) {
        gps_lon = null;
      }
    }
    
    // all other parameters
    if(!asset.datapoints) {
      asset.datapoints = [];
    }
    for(var key in req.query) {
      if(key.toLowerCase().startsWith('api_') || key.toLowerCase().startsWith('gps_')) {
        continue;
      }
      var dpfound = false;
      for(var i = 0; i < asset.datapoints.length; i++) {
        var d = asset.datapoints[i];
        if(key === d['id']) {
          d['value']=req.query[key];
          d['timestamp']=ts;
          dpfound = true;  
          break;
        }
      }
      if(!dpfound) {
        asset.datapoints.push({id: key, value: req.query[key], timestamp: ts});
      }
    }

    if(gps_lat && gps_lon) {
      asset.gps_lon = gps_lon;
      asset.gps_lat = gps_lat;
    }
    asset.lastsignal_ts = ts;
    persistence.updateAssetDatapoints(asset);
    res.json({status: 'ok'});
  } else {
    res.status(404).send("Asset Not Found");
  }
});


module.exports = router;
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
    var ts = new Date().getTime();
    asset.lastsignal_ts = ts;
    if(!asset.datapoints) {
      asset.datapoints = [];
    }
    for(var key in req.query) {
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
    persistence.updateAssetDatapoints(asset);
    res.json({status: 'ok'});
  } else {
    res.status(404).send("Asset Not Found");
  }
});


module.exports = router;
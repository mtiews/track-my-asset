const loki = require("lokijs");
const uuidv4 = require('uuid/v4');

var persistence = {
  getAllAssetsByOwner: function(owner) {
    return stripResultsetMetadata(db.getCollection(ASSET_COLLECTION).find({'owner': owner}));
  },
  getPublicAssets: function(owner) {
    return stripResultsetMetadata(db.getCollection(ASSET_COLLECTION).find({'visibility': 'public'}));
  },
  getAssetById: function(id) {
    return stripMetadata(db.getCollection(ASSET_COLLECTION).findOne({'id': id}));
  },
  createAsset: function(asset) {
    asset.id = uuidv4();
    asset.gps_lat = 0.0;
    asset.gps_lon = 0.0;
    return stripMetadata(db.getCollection(ASSET_COLLECTION).insert(asset));
  },
  updateAsset: function(asset) {
    const oldAsset = db.getCollection(ASSET_COLLECTION).findOne({'id': asset.id});
    oldAsset.name = asset.name;
    oldAsset.secret = asset.secret;
    oldAsset.description = asset.description;
    oldAsset.visibility = asset.visibility;
    return stripMetadata(db.getCollection(ASSET_COLLECTION).update(oldAsset));
  },
  updateAssetDatapoints: function(asset) {
    const oldAsset = db.getCollection(ASSET_COLLECTION).findOne({'id': asset.id});
    oldAsset.datapoints = asset.datapoints;
    oldAsset.gps_lat = asset.gps_lat;
    oldAsset.gps_lon = asset.gps_lon;
    oldAsset.lastsignal_ts = asset.lastsignal_ts;
    return stripMetadata(db.getCollection(ASSET_COLLECTION).update(oldAsset));
  },
  deleteAsset: function(id) {
    const asset = db.getCollection(ASSET_COLLECTION).findOne({'id': id});
    db.getCollection(ASSET_COLLECTION).remove(asset);
    return stripMetadata(asset);
  },
  deleteAssetDatapoint: function(assetId, dpId) {
    const asset = db.getCollection(ASSET_COLLECTION).findOne({'id': assetId});
    var newdps = asset.datapoints.filter(d => d.id !== dpId);
    asset.datapoints = newdps;
    return stripMetadata(db.getCollection(ASSET_COLLECTION).update(asset));
  }
}

const ASSET_COLLECTION = 'assets';

var db = new loki('tma.db', {
  autoload: true,
  autoloadCallback : databaseInitialize,
  autosave: true, 
  autosaveInterval: 4000
});

function databaseInitialize() {
var assets = db.getCollection(ASSET_COLLECTION);
  if (assets === null) {
    assets = db.addCollection(ASSET_COLLECTION, { unique: ['id'], indices: ['id'] });
  }
}

function stripMetadata(result) {
  if(result) {
    const cleanRec = Object.assign({}, result);
    delete cleanRec['meta'];
    delete cleanRec['$loki'];
    return cleanRec;
  } else {
    return result;
  }
}

function stripResultsetMetadata( results ) {
  const records = [];
  for (var i = 0; i < results.length; i++) {
    records.push( stripMetadata(results[i]) );
  }
  return records;
}

module.exports = persistence;
const loki = require("lokijs");
const uuidv4 = require('uuid/v4');

var persistence = {
    getAllAssets: function() {
        return db.getCollection(ASSET_COLLECTION).find({})
    },
    getAssetById: function(id) {
        return db.getCollection(ASSET_COLLECTION).findOne({'id': id});
    },
    createAsset: function(asset) {
        asset.id = uuidv4();
        return db.getCollection(ASSET_COLLECTION).insert(asset)
    },
    updateAsset: function(asset) {
        var oldAsset = db.getCollection(ASSET_COLLECTION).findOne({'id': asset.id});
        oldAsset.name = asset.name;
        oldAsset.description = asset.description;
        oldAsset.visibility = asset.visibility;
        return db.getCollection(ASSET_COLLECTION).update(asset);
    },
    deleteAsset: function(id) {
        var asset = db.getCollection(ASSET_COLLECTION).findOne({'id': id});
        db.getCollection(ASSET_COLLECTION).remove(asset);
        return asset;
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

module.exports = persistence;